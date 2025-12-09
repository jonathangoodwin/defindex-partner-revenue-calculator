"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface CalculatorProps {
  activeUsers: number
  setActiveUsers: (value: number) => void
  avgBalance: number
  setAvgBalance: (value: number) => void
  savingsRate: number
  setSavingsRate: (value: number) => void
}

const balanceOptions = [1, 10, 100, 1000, 10000]

export function Calculator({
  activeUsers,
  setActiveUsers,
  avgBalance,
  setAvgBalance,
  savingsRate,
  setSavingsRate,
}: CalculatorProps) {
  // Convert linear slider value (0-100) to logarithmic scale (1k-10M)
  const logToLinear = (value: number): number => {
    const minLog = Math.log10(1000)
    const maxLog = Math.log10(10000000)
    const scale = (maxLog - minLog) / 100
    return Math.round(Math.pow(10, minLog + scale * value))
  }

  const linearToLog = (value: number): number => {
    const minLog = Math.log10(1000)
    const maxLog = Math.log10(10000000)
    const scale = (maxLog - minLog) / 100
    return (Math.log10(value) - minLog) / scale
  }

  const handleSliderChange = (values: number[]) => {
    setActiveUsers(logToLinear(values[0]))
  }

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-heading font-bold text-white">
          Configure Your Parameters
        </CardTitle>
        <p className="text-white/70 mt-2">Adjust these inputs to see your potential revenue</p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Input 1: Active Users */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-lg font-semibold text-white">How many active users does your wallet/app have?</label>
            <motion.span
              key={activeUsers}
              initial={{ scale: 1.2, color: "#D3FFB4" }}
              animate={{ scale: 1, color: "#FFFFFF" }}
              className="text-2xl font-bold tabular-nums"
            >
              {formatNumber(activeUsers)}
            </motion.span>
          </div>
          <div className="relative">
            <style jsx global>{`
              [data-slot="slider-range"] {
                background: linear-gradient(to right, #D3FFB4, #D3FBFF) !important;
              }
              [data-slot="slider-thumb"] {
                border-color: #D3FFB4 !important;
                box-shadow: 0 0 10px rgba(211, 255, 180, 0.4) !important;
              }
              [data-slot="slider-thumb"]:hover {
                ring-color: rgba(211, 255, 180, 0.3) !important;
              }
            `}</style>
            <Slider
              value={[linearToLog(activeUsers)]}
              onValueChange={handleSliderChange}
              min={0}
              max={100}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-white/60">
            <span>1,000</span>
            <span>10,000,000</span>
          </div>
        </div>

        {/* Input 2: Average Balance */}
        <div className="space-y-4">
          <label className="text-lg font-semibold text-white block">Average stablecoin balance per user</label>
          <div className="flex flex-wrap gap-3">
            {balanceOptions.map((value) => (
              <Button
                key={value}
                onClick={() => setAvgBalance(value)}
                variant={avgBalance === value ? "default" : "outline"}
                className={`
                  px-6 py-6 text-lg font-semibold transition-all
                  ${
                    avgBalance === value
                      ? "bg-gradient-to-r from-[#D3FFB4] to-[#DEC9F4] text-[#014751] border-transparent shadow-lg shadow-[#D3FFB4]/30"
                      : "bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-[#D3FFB4]"
                  }
                `}
              >
                ${value.toLocaleString()}
              </Button>
            ))}
          </div>
        </div>

        {/* Input 3: Savings Rate */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-lg font-semibold text-white">What % of users would use a yield feature?</label>
            <motion.span
              key={savingsRate}
              initial={{ scale: 1.2, color: "#D3FFB4" }}
              animate={{ scale: 1, color: "#FFFFFF" }}
              className="text-2xl font-bold tabular-nums"
            >
              {savingsRate}%
            </motion.span>
          </div>
          <div className="relative">
            <style jsx global>{`
              [data-slot="slider-range"] {
                background: linear-gradient(to right, #D3FFB4, #D3FBFF) !important;
              }
              [data-slot="slider-thumb"] {
                border-color: #D3FFB4 !important;
                box-shadow: 0 0 10px rgba(211, 255, 180, 0.4) !important;
              }
            `}</style>
            <Slider
              value={[savingsRate]}
              onValueChange={(values) => setSavingsRate(values[0])}
              min={5}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-white/60">
            <span>5%</span>
            <span>100%</span>
          </div>
          <p className="text-sm text-white/60 italic">Industry average is 15-25% for opt-in yield features</p>
        </div>
      </CardContent>
    </Card>
  )
}
