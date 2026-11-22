import { Award, Sprout } from 'lucide-react';
import { PlantSpec, STAGE_LABELS } from '../types/game';
import { PlantArtwork } from './PlantArtwork';

interface StageModalProps {
  isOpen: boolean;
  stage: number;
  plant: PlantSpec;
  score: number;
  onClose: () => void;
  onPlantNew: () => void;
}

export function StageModal({
  isOpen,
  stage,
  plant,
  score,
  onClose,
  onPlantNew,
}: StageModalProps) {
  if (!isOpen) return null;

  const isMature = stage >= 5;
  const stageInfo = STAGE_LABELS[stage] || STAGE_LABELS[1];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stage-modal-title"
    >
      <div className="w-full max-w-md rounded-3xl border border-[#c7d6bf] bg-white p-6 shadow-xl animate-modal-rise space-y-5">
        {isMature ? (
          <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden border border-[#d6e0cf] bg-[#f5f7f2]">
            <PlantArtwork
              src={plant.imageSrc}
              alt={plant.name}
              className="w-full h-full object-cover"
              fallbackLabel={plant.name}
            />
          </div>
        ) : (
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#e6f2ea] text-[#1f6e43] flex items-center justify-center">
            <Award className="w-7 h-7" />
          </div>
        )}

        <div className="text-center space-y-2">
          <p className="text-xs font-semibold text-[#1f6e43]">
            Peringkat {stage}/5 · {stageInfo.title}
          </p>
          <h2
            id="stage-modal-title"
            className="text-2xl font-bold text-[#19281e]"
          >
            {isMature ? 'Pokok Matang Sepenuhnya!' : 'Peringkat Naik!'}
          </h2>
          <p className="text-sm text-[#4a5e51] leading-relaxed">
            {isMature
              ? `Tahniah! ${plant.name} anda telah berjaya tumbuh matang sepenuhnya dan dimasukkan ke dalam koleksi taman.`
              : `${plant.name} anda kini memasuki peringkat ${stage} (${stageInfo.title}). Teruskan penjagaan yang konsisten!`}
          </p>
          <p className="text-xs text-[#5a6f61] font-mono-nums pt-1">
            Jumlah Mata Semasa: {score}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          {isMature && (
            <button
              type="button"
              onClick={onPlantNew}
              className="flex-1 min-h-[46px] rounded-xl border border-[#b9ceb0] bg-[#f4f8f1] hover:bg-[#e8f0e3] text-[#1f6e43] text-sm font-semibold px-4 py-2.5 flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Sprout className="w-4 h-4 shrink-0" />
              <span>Tanam Baharu</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 min-h-[46px] rounded-xl bg-[#1f6e43] hover:bg-[#195a36] text-white text-sm font-semibold px-4 py-2.5 transition-colors whitespace-nowrap cursor-pointer"
          >
            Teruskan
          </button>
        </div>
      </div>
    </div>
  );
}
