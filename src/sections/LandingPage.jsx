'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VisualStage } from '../components/landing/VisualStage'
import { AICommandEditor } from '../components/landing/AICommandEditor'
import { Sparkles } from 'lucide-react'

function parseStructuredResponse(response) {
  if (!response || typeof response !== 'string') return null
  const trimmed = response.trim()

  if (trimmed.startsWith('{')) {
    try {
      return JSON.parse(trimmed)
    } catch {
      // fall through
    }
  }

  const codeBlockMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (codeBlockMatch?.[1]) {
    try {
      return JSON.parse(codeBlockMatch[1].trim())
    } catch {
      // fall through
    }
  }

  return null
}

const TOPICS = {
  welcome: {
    title: 'Welcome to Prigenix',
    description:
      'An AI automation and software engineering studio. We help businesses eliminate repetitive work and build systems that scale.',
  },
  'what-is': {
    title: 'What is Prigenix?',
    description:
      'We are a product engineering studio that combines AI agents, workflow automation, industrial IoT, and custom software into one delivery team.',
  },
  automate: {
    title: 'What can you automate?',
    description:
      'Any repeatable process: invoice processing, customer support triage, ERP sync, document extraction, email routing, and data entry.',
  },
  stack: {
    title: 'What tech stack do you use?',
    description:
      'React, Next.js, TypeScript, Node.js, Python, Go, AWS, Docker, Kubernetes, and modern AI APIs. We pick the right tools for your product.',
  },
  process: {
    title: 'How do you build?',
    description:
      'Discover → Design → Build → Deploy → Optimize. We work in two-week sprints with live demos, tests, and documentation from day one.',
  },
  industrial: {
    title: 'Industrial automation?',
    description:
      'Yes. We connect PLCs, sensors, and SCADA systems to cloud dashboards, triggering maintenance alerts before failures happen.',
  },
  results: {
    title: 'What results have you delivered?',
    description:
      'Clients have automated over 2.4M tasks, saved 800+ hours monthly, and achieved an average 340% ROI across production systems.',
  },
}

function truncate(text, maxLength) {
  if (!text) return ''
  const trimmed = text.trim()
  if (trimmed.length <= maxLength) return trimmed
  return `${trimmed.slice(0, maxLength).trim()}...`
}

function getFriendlyDescription(aiResponse, aiQuestion) {
  if (!aiResponse) {
    return aiQuestion
      ? truncate(aiQuestion, 160)
      : 'Ask a question and watch the visualization generate from the answer.'
  }

  const trimmed = aiResponse.trim()
  let jsonText = trimmed
  const codeBlockMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (codeBlockMatch?.[1]) jsonText = codeBlockMatch[1].trim()

  if (jsonText.startsWith('{')) {
    try {
      const parsed = JSON.parse(jsonText)
      if (parsed.message) return truncate(parsed.message, 160)
    } catch {
      // fall through
    }
  }

  return truncate(aiResponse, 160)
}

function getTopicData(topic, aiResponse, aiQuestion) {
  if (topic === 'ai-response') {
    return {
      title: 'AI Response',
      description: getFriendlyDescription(aiResponse, aiQuestion),
    }
  }
  return (
    TOPICS[topic] || {
      title: 'Prigenix',
      description: 'Explore AI automation, custom software, and industrial IoT solutions.',
    }
  )
}

export function LandingPage() {
  const [topic, setTopic] = useState('welcome')
  const [aiResponse, setAiResponse] = useState(null)
  const [aiQuestion, setAiQuestion] = useState(null)
  const [selectionData, setSelectionData] = useState(null)
  const [selectedOptionId, setSelectedOptionId] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [leadCapture, setLeadCapture] = useState({ status: 'idle' })
  const topicData = getTopicData(topic, aiResponse, aiQuestion)

  const handleTopicChange = useCallback((newTopic) => {
    setTopic(newTopic)
  }, [])

  const handleAIResponse = useCallback((response, question) => {
    const structured = parseStructuredResponse(response)
    setAiResponse(response)
    setAiQuestion(question)
    setTopic('ai-response')

    if (structured?.type === 'selection' && Array.isArray(structured.options)) {
      setSelectionData(structured)
      setSelectedOptionId(null)
      setDetailOpen(false)
      setLeadCapture({ status: 'idle' })
    } else if (structured?.type === 'lead_capture') {
      setSelectionData(null)
      setSelectedOptionId(null)
      setDetailOpen(false)
      setLeadCapture({ status: 'requested' })
    } else {
      setSelectionData(null)
      setSelectedOptionId(null)
      setDetailOpen(false)
      setLeadCapture({ status: 'idle' })
    }
  }, [])

  const handleSelectOption = useCallback((optionId) => {
    setSelectedOptionId(optionId)
    setDetailOpen(optionId !== null)
  }, [])

  const handleInterested = useCallback((_option) => {
    setLeadCapture({ status: 'requested' })
  }, [])

  const handleLeadCaptureSubmit = useCallback((data) => {
    setLeadCapture({ status: 'submitted', data })
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden bg-background mesh-gradient">
      {/* Floating gradient orbs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-20 -right-20 h-[350px] w-[350px] rounded-full bg-green-500/5 blur-[90px]"
      />

      {/* Top branding bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 z-10 flex h-16 items-center justify-between px-5 md:h-20 md:px-10"
      >
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-background shadow-industrial md:h-12 md:w-12">
            <img src="/logo.svg" alt="Prigenix" className="h-7 w-7 md:h-8 md:w-8" />
          </div>
          <span className="font-sans text-xl font-extrabold tracking-tight text-text text-emboss md:text-2xl">
            PRIGENIX
          </span>
        </a>
        <motion.div
          animate={{ boxShadow: ['0 0 0 0 rgba(255,71,87,0)', '0 0 0 10px rgba(255,71,87,0.1)', '0 0 0 0 rgba(255,71,87,0)'] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2 rounded-full bg-background px-4 py-2 shadow-industrial"
        >
          <Sparkles size={16} className="text-accent" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted md:text-xs">
            AI Guide
          </span>
        </motion.div>
      </motion.div>

      {/* Main content */}
      <div className="flex h-screen flex-col gap-4 p-4 pt-20 md:flex-row md:gap-6 md:p-6 md:pt-24">
        {/* Left: Text + Visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
          className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl bg-foreground/80 shadow-industrial-floating animate-border-glow"
        >
          {/* Text explanation */}
          <div className="shrink-0 px-6 py-5 md:px-10 md:py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={topic}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '60px' }}
                  className="mb-4 h-1 rounded-full bg-accent"
                />
                <h1 className="font-sans text-2xl font-extrabold text-text text-emboss md:text-4xl lg:text-5xl">
                  {topicData.title}
                </h1>
                <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-text-muted md:text-lg lg:text-xl">
                  {topicData.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visual animation */}
          <div className="min-h-0 flex-1 p-4 md:p-8">
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-foreground to-background shadow-industrial">
              <VisualStage
                topic={topic}
                aiResponse={aiResponse}
                aiQuestion={aiQuestion}
                selectionData={selectionData}
                selectedOptionId={selectedOptionId}
                detailOpen={detailOpen}
                onSelectOption={handleSelectOption}
                onInterested={handleInterested}
              />
            </div>
          </div>
        </motion.div>

        {/* Right: AI Command Editor */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.175, 0.885, 0.32, 1.275],
          }}
          className="h-[42vh] shrink-0 md:h-auto md:w-[400px] lg:w-[440px] xl:w-[480px]"
        >
          <AICommandEditor
            onTopicChange={handleTopicChange}
            onAIResponse={handleAIResponse}
            topics={TOPICS}
            leadCapture={leadCapture}
            onLeadCaptureSubmit={handleLeadCaptureSubmit}
          />
        </motion.div>
      </div>
    </div>
  )
}
