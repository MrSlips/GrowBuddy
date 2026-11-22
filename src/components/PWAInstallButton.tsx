import { useState } from 'react';
import { Download, Share, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export function PWAInstallButton() {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        aria-label="Pasang aplikasi GrowBuddy"
        className="min-h-[40px] rounded-xl border border-[#c7d6bf] bg-[#eef5ea] hover:bg-[#e1eedb] text-[#195a36] text-xs sm:text-sm font-semibold px-3 sm:px-3.5 py-2 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6e43]"
      >
        <Download className="w-4 h-4 shrink-0" />
        <span className="sm:hidden">Pasang</span>
        <span className="hidden sm:inline">Pasang App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          aria-label="Cara pasang aplikasi di iOS"
          className="min-h-[40px] rounded-xl border border-[#c7d6bf] bg-[#eef5ea] hover:bg-[#e1eedb] text-[#195a36] text-xs sm:text-sm font-semibold px-3 sm:px-3.5 py-2 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6e43]"
        >
          <Download className="w-4 h-4 shrink-0" />
          <span className="sm:hidden">Pasang</span>
          <span className="hidden sm:inline">Pasang iOS</span>
        </button>

        {showIOSGuide && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4"
            onClick={() => setShowIOSGuide(false)}
          >
            <div
              className="w-full max-w-sm rounded-3xl border border-[#d6e0cf] bg-white p-6 shadow-xl animate-modal-rise"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#1f6e43] uppercase tracking-wide">
                    Aplikasi Web (PWA)
                  </p>
                  <h3
                    id="ios-install-title"
                    className="text-lg font-bold text-[#19281e] mt-0.5"
                  >
                    Pasang di iPhone / iPad
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  aria-label="Tutup panduan pemasangan"
                  className="min-h-[36px] min-w-[36px] rounded-xl border border-[#dde5d7] flex items-center justify-center text-[#556a5b] hover:bg-[#f6f8f4] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <ol className="mt-4 space-y-2.5 text-sm text-[#394b3e]">
                <li className="flex items-start gap-2.5">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#eef5ea] text-[#1f6e43] text-xs font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Tekan butang{' '}
                    <strong className="inline-flex items-center gap-1 text-[#19281e]">
                      Kongsi <Share className="w-3.5 h-3.5 inline" />
                    </strong>{' '}
                    pada bar pelayar Safari.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#eef5ea] text-[#1f6e43] text-xs font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Skrol ke bawah dan pilih{' '}
                    <strong className="text-[#19281e]">
                      Add to Home Screen
                    </strong>{' '}
                    (Tambah ke Skrin Utama).
                  </span>
                </li>
              </ol>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full min-h-[44px] rounded-xl bg-[#1f6e43] hover:bg-[#195a36] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Faham
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
}
