import React, { useState } from 'react'
import { Linkedin, Download } from 'lucide-react'
import QRCard from './components/QRCard'

export default function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <QRCard />
    </div>
  )
}