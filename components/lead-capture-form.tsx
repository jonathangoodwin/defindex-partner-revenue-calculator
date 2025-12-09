"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    telegram: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    // Store in localStorage (in production, this would be sent to a backend/webhook)
    const leads = JSON.parse(localStorage.getItem("defindex_leads") || "[]")
    leads.push({
      ...formData,
      timestamp: new Date().toISOString(),
    })
    localStorage.setItem("defindex_leads", JSON.stringify(leads))

    setSubmitted(true)
  }

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10 max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-heading font-bold text-white text-center">
          Ready to explore integration?
        </CardTitle>
        <p className="text-white/70 text-center mt-2">Get a personalized demo and technical walkthrough</p>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-white">
                  Name <span className="text-[#D3FFB4]">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`bg-white/5 border-white/20 text-white placeholder:text-white/50 focus-visible:border-[#D3FFB4] focus-visible:ring-[#D3FFB4]/20 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-white">
                  Email <span className="text-[#D3FFB4]">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-white/5 border-white/20 text-white placeholder:text-white/50 focus-visible:border-[#D3FFB4] focus-visible:ring-[#D3FFB4]/20 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-semibold text-white">
                  Company <span className="text-[#D3FFB4]">*</span>
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className={`bg-white/5 border-white/20 text-white placeholder:text-white/50 focus-visible:border-[#D3FFB4] focus-visible:ring-[#D3FFB4]/20 ${
                    errors.company ? "border-red-500" : ""
                  }`}
                  placeholder="Acme Wallet"
                />
                {errors.company && <p className="text-red-400 text-sm">{errors.company}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="telegram" className="text-sm font-semibold text-white">
                  Telegram Handle <span className="text-white/60">(optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">@</span>
                  <Input
                    id="telegram"
                    name="telegram"
                    type="text"
                    value={formData.telegram}
                    onChange={handleChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50 focus-visible:border-[#D3FFB4] focus-visible:ring-[#D3FFB4]/20 pl-8"
                    placeholder="username"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D3FFB4] to-[#DEC9F4] hover:from-[#DEC9F4] hover:to-[#D3FBFF] text-[#014751] font-semibold py-6 text-lg shadow-lg shadow-[#D3FFB4]/20 transition-all hover:shadow-xl hover:shadow-[#D3FFB4]/30"
              >
                Request Integration Info
              </Button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#D3FFB4] to-[#DEC9F4] rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-[#014751]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">Thank You!</h3>
              <p className="text-white/70 max-w-md mx-auto">
                We've received your information and will reach out shortly with integration details and a personalized
                demo.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false)
                  setFormData({ name: "", email: "", company: "", telegram: "" })
                }}
                variant="outline"
                className="mt-4 bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                Submit Another
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
