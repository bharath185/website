import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot,
  Workflow,
  Factory,
  Code2,
  Cloud,
  Smartphone,
  Lock,
  Sparkles,
  BarChart3,
  Settings,
  CheckCircle,
  Database,
  Layers,
  Server,
  TrendingUp,
  Users,
  Target,
  Zap,
  Shield,
  ChevronRight,
} from 'lucide-react'

const CONCEPT_MAP = [
  {
    keywords: [
      'ai', 'agent', 'intelligent', 'llm', 'machine learning', 'model', 'gpt',
      'extract', 'classify', 'predict', 'generative', 'nlp', 'vision',
      'artificial intelligence', 'neural', 'embedding', 'vector',
    ],
    icon: Bot,
    label: 'AI / Agents',
    color: 'text-accent',
    bg: 'from-red-500/20 to-pink-500/20',
    weight: 1.0,
  },
  {
    keywords: [
      'workflow', 'automate', 'automation', 'pipeline', 'process', 'trigger',
      'sync', 'route', 'invoice', 'email', 'document', 'routine', 'task',
      'approval', 'notification', 'crm', 'erp',
    ],
    icon: Workflow,
    label: 'Workflow',
    color: 'text-blue-500',
    bg: 'from-blue-500/20 to-cyan-500/20',
    weight: 1.0,
  },
  {
    keywords: [
      'industrial', 'factory', 'iot', 'sensor', 'plc', 'scada', 'manufacturing',
      'shop floor', 'machine', 'equipment', 'opc', 'modbus', 'telemetry',
      'predictive maintenance', 'oee',
    ],
    icon: Factory,
    label: 'Industrial IoT',
    color: 'text-green-500',
    bg: 'from-green-500/20 to-emerald-500/20',
    weight: 1.2,
  },
  {
    keywords: [
      'software', 'app', 'web', 'mobile', 'platform', 'react', 'next.js',
      'typescript', 'node', 'python', 'go', 'code', 'development', 'frontend',
      'backend', 'full stack', 'application', 'dashboard', 'portal',
    ],
    icon: Code2,
    label: 'Software',
    color: 'text-purple-500',
    bg: 'from-purple-500/20 to-violet-500/20',
    weight: 1.0,
  },
  {
    keywords: [
      'cloud', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'k8s', 'server',
      'deploy', 'hosting', 'infrastructure', 'vm', 'container', 'serverless',
      'lambda', 'ec2', 's3',
    ],
    icon: Cloud,
    label: 'Cloud',
    color: 'text-cyan-500',
    bg: 'from-cyan-500/20 to-blue-500/20',
    weight: 1.0,
  },
  {
    keywords: [
      'security', 'secure', 'encrypt', 'encryption', 'compliance', 'audit',
      'gdpr', 'hipaa', 'protect', 'sso', 'auth', 'oauth', 'penetration',
      'vulnerability', 'privacy',
    ],
    icon: Lock,
    label: 'Security',
    color: 'text-orange-500',
    bg: 'from-orange-500/20 to-yellow-500/20',
    weight: 1.0,
  },
  {
    keywords: [
      'data', 'analytics', 'dashboard', 'metric', 'report', 'chart', 'kpi',
      'roi', 'insight', 'visualization', 'business intelligence', 'kpi',
      'performance', 'tracking',
    ],
    icon: BarChart3,
    label: 'Analytics',
    color: 'text-teal-500',
    bg: 'from-teal-500/20 to-green-500/20',
    weight: 1.0,
  },
  {
    keywords: [
      'mobile', 'ios', 'android', 'app store', 'react native', 'flutter',
      'pwa', 'expo', 'swift', 'kotlin',
    ],
    icon: Smartphone,
    label: 'Mobile',
    color: 'text-indigo-500',
    bg: 'from-indigo-500/20 to-purple-500/20',
    weight: 1.1,
  },
  {
    keywords: [
      'support', 'help', 'maintain', 'monitor', 'sla', 'uptime', 'ops',
      'observability', 'logging', 'alert', 'incident', 'on-call',
    ],
    icon: Settings,
    label: 'Support',
    color: 'text-gray-500',
    bg: 'from-gray-500/20 to-slate-500/20',
    weight: 1.0,
  },
  {
    keywords: [
      'database', 'sql', 'postgres', 'mysql', 'mongodb', 'redis', 'sqlite',
      'datastore', 'schema', 'migration', 'warehouse', 'lake',
    ],
    icon: Database,
    label: 'Database',
    color: 'text-pink-500',
    bg: 'from-pink-500/20 to-rose-500/20',
    weight: 1.0,
  },
  {
    keywords: [
      'integration', 'api', 'webhook', 'connector', 'middleware', 'sync',
      'sap', 'salesforce', 'hubspot', 'zapier', 'rest', 'graphql', 'grpc',
      'interoperability',
    ],
    icon: Layers,
    label: 'Integration',
    color: 'text-violet-500',
    bg: 'from-violet-500/20 to-purple-500/20',
    weight: 1.0,
  },
  {
    keywords: [
      'devops', 'ci/cd', 'pipeline', 'github actions', 'gitlab', 'jenkins',
      'terraform', 'ansible', 'infrastructure as code', 'iac', 'release',
    ],
    icon: Server,
    label: 'DevOps',
    color: 'text-sky-500',
    bg: 'from-sky-500/20 to-blue-500/20',
    weight: 1.0,
  },
  {
    keywords: [
      'growth', 'scale', 'roi', 'revenue', 'cost', 'saving', 'efficiency',
      'productivity', 'profit', 'kpi', 'impact', 'result', 'outcome',
    ],
    icon: TrendingUp,
    label: 'Growth',
    color: 'text-emerald-500',
    bg: 'from-emerald-500/20 to-green-500/20',
    weight: 1.0,
  },
  {
    keywords: [
      'team', 'consulting', 'partner', 'staff augmentation', 'engineers',
      'developers', 'experts', 'advisor', 'strategy', 'workshop', 'training',
    ],
    icon: Users,
    label: 'Team',
    color: 'text-amber-500',
    bg: 'from-amber-500/20 to-yellow-500/20',
    weight: 1.0,
  },
  {
    keywords: [
      'design', 'ux', 'ui', 'prototype', 'figma', 'user experience',
      'interface', 'wireframe', 'usability', 'branding', 'accessible',
    ],
    icon: Target,
    label: 'Design / UX',
    color: 'text-fuchsia-500',
    bg: 'from-fuchsia-500/20 to-pink-500/20',
    weight: 1.0,
  },
  {
    keywords: [
      'reliability', 'backup', 'disaster recovery', 'failover', 'high availability',
      'ha', 'resilience', 'redundancy', 'business continuity', 'dr',
    ],
    icon: Shield,
    label: 'Reliability',
    color: 'text-lime-500',
    bg: 'from-lime-500/20 to-green-500/20',
    weight: 1.0,
  },
  {
    keywords: [
      'performance', 'optimization', 'speed', 'latency', 'cache', 'cdn',
      'load', 'throughput', 'fast', 'scalable', 'tuning',
    ],
    icon: Zap,
    label: 'Performance',
    color: 'text-yellow-500',
    bg: 'from-yellow-500/20 to-orange-500/20',
    weight: 1.0,
  },
]

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought',
  'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as',
  'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between',
  'under', 'and', 'but', 'or', 'yet', 'so', 'if', 'because', 'although',
  'though', 'while', 'where', 'when', 'that', 'which', 'who', 'whom', 'whose',
  'what', 'this', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we',
  'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her',
  'its', 'our', 'their', 'am', 'here', 'there', 'then', 'than', 'too',
  'very', 'just', 'now', 'only', 'also', 'about', 'up', 'out', 'down',
  'over', 'off', 'again', 'further', 'once', 'more', 'most', 'some', 'any',
  'all', 'both', 'each', 'few', 'other', 'such', 'no', 'nor', 'not', 'own',
  'same', 'so', 'than', 'too', 'very', 's', 't', 'don', 'doesn', 'didn',
  'wasn', 'weren', 'won', 'wouldn', 'couldn', 'shouldn', 'isn', 'aren',
  'hasn', 'haven', 'hadn', 'prigenix', 'ask', 'tell', 'like', 'want',
  'know', 'get', 'got', 'go', 'come', 'came', 'make', 'made', 'take',
  'took', 'way', 'thing', 'things', 'something', 'anything', 'everything',
  'someone', 'everyone', 'anyone', 'please', 'thanks', 'thank', 'yes', 'no',
  'hi', 'hello', 'hey', 'how', 'what', 'who', 'where', 'when', 'why',
])

const TECHNICAL_TERMS = [
  'machine learning', 'artificial intelligence', 'react native', 'next.js',
  'node.js', 'full stack', 'business intelligence', 'predictive maintenance',
  'continuous integration', 'continuous deployment', 'infrastructure as code',
  'user experience', 'user interface', 'data warehouse', 'data lake',
  'shop floor', 'supply chain', 'quality assurance', 'devops', 'ci/cd',
  'webhook', 'api', 'rest api', 'graphql', 'erp', 'crm', 'scada', 'plc',
  'kubernetes', 'docker', 'serverless', 'microservices', 'monolith',
  'postgres', 'mongodb', 'redis', 'elasticsearch', 'kafka', 'rabbitmq',
]

function normalizeText(text) {
  return (text || '').toLowerCase().replace(/\s+/g, ' ').trim()
}

function wordBoundaryMatch(text, keyword) {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i')
  return regex.test(text)
}

function scoreConcept(concept, text, question) {
  let score = 0
  for (const keyword of concept.keywords) {
    if (wordBoundaryMatch(text, keyword)) {
      score += concept.weight
      if (keyword.includes(' ')) score += 0.5
    }
  }
  if (question) {
    for (const keyword of concept.keywords) {
      if (wordBoundaryMatch(question, keyword)) {
        score += concept.weight * 0.4
      }
    }
  }
  return score
}

function detectConcepts(text, question = '') {
  const normalized = normalizeText(text)
  const normalizedQuestion = normalizeText(question)

  const scored = CONCEPT_MAP.map((concept) => ({
    concept,
    score: scoreConcept(concept, normalized, normalizedQuestion),
  }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  if (scored.length === 0) {
    const fallbackConcept = detectFallbackConcept(normalized, normalizedQuestion)
    if (fallbackConcept) return [fallbackConcept]
  }

  return scored.map((item) => item.concept)
}

function detectFallbackConcept(text, question) {
  const combined = `${text} ${question}`
  if (/\b(code|build|develop|software|app|web|platform|react|node|python)\b/i.test(combined)) {
    return CONCEPT_MAP.find((c) => c.label === 'Software')
  }
  if (/\b(automate|workflow|process|trigger|sync|invoice|routine)\b/i.test(combined)) {
    return CONCEPT_MAP.find((c) => c.label === 'Workflow')
  }
  if (/\b(ai|agent|llm|model|extract|classify|predict)\b/i.test(combined)) {
    return CONCEPT_MAP.find((c) => c.label === 'AI / Agents')
  }
  if (/\b(data|metric|report|chart|dashboard|analytics|insight)\b/i.test(combined)) {
    return CONCEPT_MAP.find((c) => c.label === 'Analytics')
  }
  if (/\b(cloud|aws|azure|server|host|deploy|container)\b/i.test(combined)) {
    return CONCEPT_MAP.find((c) => c.label === 'Cloud')
  }
  if (/\b(growth|scale|roi|revenue|saving|efficiency|productivity)\b/i.test(combined)) {
    return CONCEPT_MAP.find((c) => c.label === 'Growth')
  }
  return null
}

function cleanPhrase(phrase) {
  return phrase
    .replace(/^\s*[-•*–—]+\s*/, '')
    .replace(/^\s*\d+[.)]\s*/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function isMeaningfulPhrase(phrase) {
  const cleaned = cleanPhrase(phrase)
  if (cleaned.length < 12) return false
  const generic = /^(hi|hello|hey|sure|yes|no|okay|ok|great|thanks|thank you)/i
  return !generic.test(cleaned)
}

function extractListItems(text) {
  const normalized = (text || '').replace(/\n/g, ' \n ')

  // Bullet / numbered list lines
  const bulletLines = normalized
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => /^[-•*–—]|^\d+[.)]/.test(line))
    .map(cleanPhrase)
    .filter(isMeaningfulPhrase)

  if (bulletLines.length >= 2) return bulletLines

  // Comma-separated capability list (e.g. "We build A, B, C, and D")
  const commaItems = normalized
    .split(/[,;]/)
    .map((s) => cleanPhrase(s))
    .filter((s) => s.length > 8 && s.length < 80)
    .filter((s) => !/^(we|our|us|i|you|they)/i.test(s))

  if (commaItems.length >= 3 && commaItems.length <= 8) return commaItems

  return []
}

function extractKeyPhrases(text) {
  const normalized = (text || '').replace(/\n/g, ' ')

  const bulletLines = normalized
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => /^[-•*–—]|^\d+[.)]/.test(line))
    .map(cleanPhrase)
    .filter(isMeaningfulPhrase)

  if (bulletLines.length > 0) {
    return bulletLines.slice(0, 4).map(truncatePhrase)
  }

  const sentences = normalized
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(isMeaningfulPhrase)

  return sentences.slice(0, 3).map(truncatePhrase)
}

function truncatePhrase(phrase) {
  const cleaned = cleanPhrase(phrase)
  if (cleaned.length > 90) return `${cleaned.slice(0, 87).trim()}...`
  return cleaned
}

function tokenize(text) {
  const normalized = text.toLowerCase()
  const tokens = []
  let remaining = normalized

  for (const term of TECHNICAL_TERMS) {
    const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
    remaining = remaining.replace(regex, (match) => {
      tokens.push(match.toLowerCase())
      return ' '
    })
  }

  const words = remaining
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOP_WORDS.has(w))

  return [...tokens, ...words]
}

function extractKeywords(text) {
  const normalized = normalizeText(text)
  const words = tokenize(normalized)

  const frequency = {}
  words.forEach((w) => {
    frequency[w] = (frequency[w] || 0) + 1
  })

  const sorted = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)

  const result = []
  for (const word of sorted) {
    const isSubset = result.some((selected) =>
      selected.includes(' ') && selected.includes(word)
    )
    if (!isSubset) result.push(word)
    if (result.length >= 8) break
  }

  return result
}

function getConceptForItem(itemText, allConcepts) {
  const concepts = detectConcepts(itemText)
  if (concepts.length > 0) return concepts[0]
  return allConcepts[0] || {
    icon: CheckCircle,
    label: 'Capability',
    color: 'text-accent',
    bg: 'from-red-500/20 to-pink-500/20',
  }
}

function InteractiveListView({ items, concepts, response }) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const keywords = extractKeywords(response).slice(0, 8)

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="grid flex-1 grid-cols-1 gap-3 overflow-y-auto pr-1 md:grid-cols-2">
        {items.map((item, index) => {
          const concept = getConceptForItem(item, concepts)
          const Icon = concept.icon
          const isSelected = selectedIndex === index

          return (
            <motion.button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(isSelected ? null : index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex flex-col items-start gap-2 rounded-2xl p-4 text-left shadow-industrial transition-all ${
                isSelected ? 'bg-foreground ring-2 ring-accent' : 'bg-background'
              }`}
            >
              <div className={`absolute right-2 top-2 h-12 w-12 rounded-full bg-gradient-to-br ${concept.bg} blur-xl opacity-40`} />
              <div className="relative flex w-full items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-foreground shadow-industrial ${isSelected ? 'ring-2 ring-accent' : ''}`}>
                  <Icon size={20} className={concept.color} strokeWidth={1.5} />
                </div>
                <motion.div
                  animate={{ rotate: isSelected ? 90 : 0 }}
                  className="text-text-muted"
                >
                  <ChevronRight size={18} />
                </motion.div>
              </div>
              <span className="relative mt-1 font-sans text-sm font-bold text-text text-emboss md:text-base">
                {truncatePhrase(item)}
              </span>
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="relative overflow-hidden"
                  >
                    <p className="pt-2 font-mono text-xs leading-relaxed text-text-muted">
                      {item.length > 120 ? `${item.slice(0, 120)}...` : item}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>

      {keywords.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-3 flex flex-wrap gap-2"
        >
          {keywords.map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.04 }}
              className="rounded-full bg-muted px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-text-muted shadow-industrial-recessed"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export function DynamicAIVisual({ response, question }) {
  const safeResponse = response || ''
  const safeQuestion = question || ''
  const concepts = detectConcepts(safeResponse, safeQuestion)
  const listItems = extractListItems(safeResponse)

  const primaryConcept = concepts[0] || {
    icon: Sparkles,
    label: 'AI Insight',
    color: 'text-accent',
    bg: 'from-red-500/20 to-pink-500/20',
  }

  const PrimaryIcon = primaryConcept.icon

  if (listItems.length >= 2) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex h-full flex-col overflow-hidden px-4 py-4 md:px-6 md:py-5"
      >
        <motion.div
          initial={{ scale: 0.95, y: 12 }}
          animate={{ scale: 1, y: 0 }}
          className="mb-3 flex items-center gap-4 rounded-2xl bg-background p-3 shadow-industrial-floating"
        >
          <div className={`absolute right-4 top-4 h-16 w-16 rounded-full bg-gradient-to-br ${primaryConcept.bg} blur-2xl opacity-50`} />
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-foreground shadow-industrial">
            <PrimaryIcon size={26} className={primaryConcept.color} strokeWidth={1.5} />
          </div>
          <div className="relative min-w-0">
            <span className={`block truncate font-sans text-base font-bold text-emboss md:text-lg ${primaryConcept.color}`}>
              {primaryConcept.label}
            </span>
            <span className="block truncate font-mono text-[9px] uppercase tracking-widest text-text-muted">
              {safeQuestion.slice(0, 55) || 'Generated capabilities'}
            </span>
          </div>
        </motion.div>

        <div className="min-h-0 flex-1">
          <InteractiveListView items={listItems} concepts={concepts} response={safeResponse} />
        </div>
      </motion.div>
    )
  }

  const phrases = extractKeyPhrases(safeResponse).slice(0, 2)
  const keywords = extractKeywords(safeResponse).slice(0, 5)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full flex-col overflow-hidden px-4 py-4 md:px-6 md:py-5"
    >
      <motion.div
        initial={{ scale: 0.95, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="relative flex items-center gap-4 rounded-2xl bg-background p-4 shadow-industrial-floating"
      >
        <div className={`absolute right-3 top-3 h-16 w-16 rounded-full bg-gradient-to-br ${primaryConcept.bg} blur-2xl opacity-60`} />
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-foreground shadow-industrial md:h-16 md:w-16">
          <PrimaryIcon size={28} className={primaryConcept.color} strokeWidth={1.5} />
        </div>
        <div className="relative min-w-0">
          <span className={`block truncate font-sans text-lg font-bold text-emboss md:text-xl ${primaryConcept.color}`}>
            {primaryConcept.label}
          </span>
          <span className="mt-1 block truncate font-mono text-[10px] uppercase tracking-widest text-text-muted">
            {safeQuestion.slice(0, 55) || 'Generated insight'}
          </span>
        </div>
      </motion.div>

      {phrases.length > 0 && (
        <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-hidden">
          {phrases.map((phrase, index) => (
            <motion.div
              key={`${phrase}-${index}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              className="flex items-center gap-3 rounded-xl bg-background px-4 py-2.5 shadow-industrial"
            >
              <CheckCircle size={16} className="shrink-0 text-accent" />
              <span className="truncate font-sans text-xs text-text md:text-sm">
                {phrase}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-3 flex min-h-0 flex-wrap items-end justify-between gap-2">
        {concepts.length > 1 && (
          <div className="flex flex-1 flex-wrap gap-2">
            {concepts.slice(1, 4).map((concept, index) => {
              const Icon = concept.icon
              return (
                <motion.div
                  key={concept.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + index * 0.06 }}
                  className="flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 shadow-industrial"
                >
                  <Icon size={12} className={concept.color} />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-text-muted">
                    {concept.label}
                  </span>
                </motion.div>
              )
            })}
          </div>
        )}
        {keywords.length > 0 && (
          <div className="flex flex-wrap justify-end gap-1.5">
            {keywords.map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.04 }}
                className="rounded-md bg-muted px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-text-muted shadow-industrial-recessed"
              >
                {word}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
