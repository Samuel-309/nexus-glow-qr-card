import React, { useRef } from 'react'
import { Linkedin, Download } from 'lucide-react'

export default function QRCard() {
  const cardRef = useRef(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0a0e27',
        scale: 2,
        logging: false,
        useCORS: true,
      })
      
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = 'allan-qr-code-card.png'
      link.click()
    } catch (error) {
      console.error('Download failed:', error)
      // Fallback: Create a simple PNG export
      fallbackDownload()
    } finally {
      setIsDownloading(false)
    }
  }

  const fallbackDownload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = 1200
    canvas.height = 1400
    
    // Background
    const gradient = ctx.createLinearGradient(0, 0, 1200, 1400)
    gradient.addColorStop(0, '#0a0e27')
    gradient.addColorStop(0.5, '#0f1433')
    gradient.addColorStop(1, '#0a0e27')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1200, 1400)
    
    // Card background
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.roundRect(150, 250, 900, 800, 24)
    ctx.fill()
    
    // QR placeholder
    const qrGradient = ctx.createLinearGradient(450, 350, 750, 650)
    qrGradient.addColorStop(0, '#f3f4f6')
    qrGradient.addColorStop(1, '#e5e7eb')
    ctx.fillStyle = qrGradient
    ctx.beginPath()
    ctx.roundRect(450, 350, 300, 300, 16)
    ctx.fill()
    
    // QR text placeholder
    ctx.fillStyle = '#9ca3af'
    ctx.font = 'bold 16px Geist, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('QR CODE', 600, 595)
    ctx.fillText('Scan this code', 600, 620)
    
    // Title
    ctx.fillStyle = '#111827'
    ctx.font = 'bold 32px Geist, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('ALLAN QR CODE CARD', 600, 750)
    
    // Subtext
    ctx.fillStyle = '#9ca3af'
    ctx.font = '16px Geist, sans-serif'
    ctx.fillText('Scan to connect on LinkedIn', 600, 800)
    
    // LinkedIn indicator
    ctx.fillStyle = '#a78bfa'
    ctx.font = '14px Geist, sans-serif'
    ctx.fillText('🔗 LinkedIn', 600, 1000)
    
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'allan-qr-code-card.png'
    link.click()
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 w-full max-w-md">
      {/* Card Container */}
      <div
        ref={cardRef}
        className="card w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-12"
      >
        {/* QR Code Frame with Gradient Glow */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="gradient-glow rounded-2xl p-1">
            <div className="qr-frame">
              <div className="qr-placeholder">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-400 mb-2">
                    QR CODE
                  </div>
                  <div className="text-xs text-gray-400">
                    Scan this code
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2 tracking-tight">
          ALLAN QR CODE CARD
        </h1>

        {/* Subtext with Hover State */}
        <p className="subtext text-center text-sm sm:text-base mb-8 font-medium">
          Scan to connect on LinkedIn
        </p>

        {/* LinkedIn Icon */}
        <div className="flex justify-center mb-8">
          <Linkedin className="linkedin-icon w-6 h-6 text-gray-400" strokeWidth={1.5} />
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mx-auto mb-8"></div>

        {/* Call to Action Text */}
        <p className="text-center text-xs text-gray-500 font-medium">
          Download and share your QR code
        </p>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="download-btn w-full sm:w-auto px-8 py-3 text-white font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-75 transition-all duration-300"
      >
        <Download className="w-5 h-5" strokeWidth={2} />
        <span>{isDownloading ? 'Downloading...' : 'Download Image'}</span>
      </button>

      {/* Footer Text */}
      <p className="text-xs text-gray-400 text-center max-w-sm">
        Premium QR Code Showcase · Optimized for mobile scanning
      </p>
    </div>
  )
}