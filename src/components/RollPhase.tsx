import { useEffect, useRef, useState } from 'react';
import type { CharacterCard } from '../game/types';
import { useI18n } from '../i18n/LanguageContext';
import { DuelSide } from './DuelSide';

const SPIN_MS = 800;
const TICK_MS = 70;
const randFace = () => Math.floor(Math.random() * 6) + 1;

type Props = {
  cpu: CharacterCard;
  player: CharacterCard;
  /** Se llama al terminar la animación; aquí se commitea la tirada real. */
  onRoll: () => void;
};

/**
 * Fase de tirada: muestra ambas cartas con un dado que rueda ~0.8 s. Las caras
 * girando son sólo visuales; la tirada real se decide en el reducer y aparece en
 * la fase siguiente (tramo resaltado + poder), con el dado conservado en su sitio.
 */
export function RollPhase({ cpu, player, onRoll }: Props) {
  const { t } = useI18n();
  const [rolling, setRolling] = useState(false);
  const [faces, setFaces] = useState({ player: 1, cpu: 1 });
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  function handleRoll() {
    if (rolling) return;
    setRolling(true);
    const start = Date.now();
    timer.current = window.setInterval(() => {
      setFaces({ player: randFace(), cpu: randFace() });
      if (Date.now() - start >= SPIN_MS) {
        if (timer.current) clearInterval(timer.current);
        timer.current = null;
        onRoll();
      }
    }, TICK_MS);
  }

  return (
    <section className="phase">
      <p className="prompt">{t.prompts.rollPhase}</p>
      <div className="duel">
        <DuelSide
          label={t.hud.you}
          card={player}
          roll={null}
          die={{ value: faces.player, spinning: rolling }}
        />
        <span className="vs">vs</span>
        <DuelSide
          label={t.hud.cpu}
          card={cpu}
          roll={null}
          die={{ value: faces.cpu, spinning: rolling }}
        />
      </div>
      <button type="button" className="action" onClick={handleRoll} disabled={rolling}>
        {rolling ? t.buttons.rolling : t.buttons.roll}
      </button>
    </section>
  );
}
