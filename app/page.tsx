"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator } from "@/components/calculator"
import { ResultsDashboard } from "@/components/results-dashboard"
import { LeadCaptureForm } from "@/components/lead-capture-form"

export default function Page() {
  const [activeUsers, setActiveUsers] = useState(50000)
  const [avgBalance, setAvgBalance] = useState(100)
  const [savingsRate, setSavingsRate] = useState(20)

  return (
    <div className="min-h-screen bg-[#014751] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#DEC9F4]/20 to-[#D3FBFF]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#D3FFB4]/20 to-[#DEC9F4]/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Hero Header */}
        <header className="border-b border-white/10 bg-gradient-to-b from-[#014751] to-[#014751]/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="text-center space-y-4 max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 bg-gradient-to-r from-[#D3FFB4] via-[#DEC9F4] to-[#D3FBFF] bg-clip-text text-transparent">
                  DeFindex
                </h1>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
                  Calculate Your Integration Revenue
                </h2>
                <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                  See how much your wallet or app could earn by offering automated stablecoin yield to your users
                </p>
              </motion.div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 md:py-16 space-y-12">
          {/* Calculator Input Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Calculator
              activeUsers={activeUsers}
              setActiveUsers={setActiveUsers}
              avgBalance={avgBalance}
              setAvgBalance={setAvgBalance}
              savingsRate={savingsRate}
              setSavingsRate={setSavingsRate}
            />
          </motion.div>

          {/* Results Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ResultsDashboard activeUsers={activeUsers} avgBalance={avgBalance} savingsRate={savingsRate} />
          </motion.div>

          {/* Social Proof Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-8">
              <blockquote className="text-lg md:text-xl text-white/80 italic leading-relaxed">
                "Our users don't care about blockchain — they care about saving and sending money safely."
              </blockquote>
              <p className="mt-4 text-[#D3FFB4] font-semibold">— Beans Wallet</p>
            </div>
          </motion.div>

          {/* Lead Capture Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <LeadCaptureForm />
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/70">
              Powered by{" "}
              <a
                href="https://www.defindex.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D3FFB4] hover:text-[#D3FBFF] transition-colors"
              >
                DeFindex
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
