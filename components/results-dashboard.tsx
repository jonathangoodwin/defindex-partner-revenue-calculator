"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ResultsDashboardProps {
  activeUsers: number
  avgBalance: number
  savingsRate: number
}

interface Scenario {
  name: string
  apy: number
  isRecommended?: boolean
}

const scenarios: Scenario[] = [
  { name: "Conservative", apy: 8 },
  { name: "Moderate", apy: 12, isRecommended: true },
  { name: "Peak", apy: 18 },
]

export function ResultsDashboard({ activeUsers, avgBalance, savingsRate }: ResultsDashboardProps) {
  const participatingUsers = Math.round(activeUsers * (savingsRate / 100))
  const totalTVL = participatingUsers * avgBalance

  const calculateRevenue = (apy: number) => {
    const annualYield = totalTVL * (apy / 100)
    const partnerRevenue = annualYield * 0.04
    const monthlyRevenue = partnerRevenue / 12
    return { annualRevenue: partnerRevenue, monthlyRevenue }
  }

  // ROI calculations using Moderate scenario
  const moderateRevenue = calculateRevenue(12)
  const integrationCost = 4000
  const weeklyRevenue = moderateRevenue.monthlyRevenue / 4.33
  const paybackWeeks = weeklyRevenue > 0 ? integrationCost / weeklyRevenue : Number.POSITIVE_INFINITY
  const firstYearProfit =
    moderateRevenue.annualRevenue > 0
      ? ((moderateRevenue.annualRevenue - integrationCost) / moderateRevenue.annualRevenue) * 100
      : 0

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  return (
    <div className="space-y-8">
      {/* TVL Highlight */}
      <Card className="bg-gradient-to-br from-[#D3FFB4]/10 to-[#DEC9F4]/10 border-[#D3FFB4]/30 backdrop-blur-md">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-white/70 text-lg mb-2">Total Value Locked (TVL)</p>
            <AnimatedNumber
              value={totalTVL}
              className="text-4xl md:text-5xl font-heading font-bold text-[#D3FFB4]"
              prefix="$"
            />
            <p className="text-white/70 mt-2">with {formatNumber(participatingUsers)} participating users</p>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Projections Grid */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-heading font-bold text-white">Revenue Projections</CardTitle>
          <p className="text-white/70 mt-2">Based on 4% partner revenue share</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarios.map((scenario) => {
              const { annualRevenue, monthlyRevenue } = calculateRevenue(scenario.apy)
              return (
                <motion.div
                  key={scenario.name}
                  whileHover={{ scale: 1.02 }}
                  className={`
                    rounded-xl p-6 space-y-4
                    ${
                      scenario.isRecommended
                        ? "bg-gradient-to-br from-[#D3FFB4]/20 to-[#DEC9F4]/20 border-2 border-[#D3FFB4] shadow-lg shadow-[#D3FFB4]/20"
                        : "bg-white/5 backdrop-blur-sm border border-white/10"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-heading font-bold text-white">{scenario.name}</h3>
                    {scenario.isRecommended && (
                      <span className="px-3 py-1 text-xs font-semibold bg-[#D3FFB4] text-[#014751] rounded-full">
                        LIKELIEST
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">APY</p>
                    <p className="text-3xl font-heading font-bold text-[#D3FFB4]">{scenario.apy}%</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Monthly Revenue</p>
                    <AnimatedNumber
                      value={monthlyRevenue}
                      className="text-2xl font-bold text-white tabular-nums"
                      prefix="$"
                    />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Annual Revenue</p>
                    <AnimatedNumber
                      value={annualRevenue}
                      className="text-2xl font-heading font-bold text-[#D3FBFF] tabular-nums"
                      prefix="$"
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* ROI Analysis */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-heading font-bold text-white">ROI Analysis</CardTitle>
          <p className="text-white/70 mt-2">Based on moderate (12% APY) scenario</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-white/70 text-sm">Integration Cost</p>
              <p className="text-3xl font-heading font-bold text-white">{formatCurrency(integrationCost)}</p>
              <p className="text-sm text-white/60">1 week of dev/design/QA</p>
            </div>
            <div className="space-y-2">
              <p className="text-white/70 text-sm">Payback Period</p>
              <AnimatedNumber
                value={paybackWeeks}
                className={`text-3xl font-heading font-bold tabular-nums ${paybackWeeks < 4 ? "text-[#D3FFB4]" : "text-[#D3FBFF]"}`}
                suffix=" weeks"
                decimals={1}
              />
              {paybackWeeks < 4 && <p className="text-sm text-[#D3FFB4] font-semibold">⚡ Ultra-fast payback!</p>}
            </div>
            <div className="space-y-2">
              <p className="text-white/70 text-sm">First-Year Profit Margin</p>
              <AnimatedNumber
                value={firstYearProfit}
                className="text-2xl font-heading font-bold text-[#D3FFB4] tabular-nums"
                suffix="%"
                decimals={1}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AnimatedNumber({
  value,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number
  className?: string
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const duration = 500
    const steps = 30
    const increment = (value - displayValue) / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep === steps) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue((prev) => prev + increment)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const formatValue = (val: number): string => {
    if (!isFinite(val)) return "∞"
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(val)
  }

  return (
    <motion.span
      key={value}
      initial={{ scale: 1.1, color: "#D3FFB4" }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {prefix}
      {formatValue(displayValue)}
      {suffix}
    </motion.span>
  )
}
