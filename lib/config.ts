import {
  At,
  DeviceMobile,
  Envelope,
  IdentificationCard,
  MapPin,
  User,
  Users,
} from "@phosphor-icons/react/dist/ssr"

export const NON_AUTH_DAILY_MESSAGE_LIMIT = 5
export const AUTH_DAILY_MESSAGE_LIMIT = 1000
export const REMAINING_QUERY_ALERT_THRESHOLD = 2
export const DAILY_FILE_UPLOAD_LIMIT = 5
export const DAILY_SPECIAL_AGENT_LIMIT = 5
export const DAILY_LIMIT_PRO_MODELS = 500

export const FREE_MODELS_IDS = [
  "deepseek-r1",
  "pixtral-large-latest",
  "mistral-large-latest",
  "gpt-4.1-nano",
]

export const MODEL_DEFAULT = "gpt-4.1-nano"

export const APP_NAME = "inVerus"
export const APP_DOMAIN = "https://inVerus.chat"

export const SUGGESTIONS = [
  {
    label: "First Name",
    highlight: "First Name",
    prompt: `First Name`,
    icon: User,
  },
  {
    label: "Family Name",
    highlight: "Family Name",
    prompt: `Family Name`,
    icon: Users,
  },
  {
    label: "Location",
    highlight: "Location",
    prompt: `Location`,
    icon: MapPin,
  },
  {
    label: "ID Number",
    highlight: "ID Number",
    prompt: `ID Number`,
    icon: IdentificationCard,
  },
  {
    label: "Phone Number",
    highlight: "Phone Number",
    prompt: `Phone Number`,
    icon: DeviceMobile,
  },
  {
    label: "Email",
    highlight: "Email",
    prompt: `Email`,
    icon: Envelope,
  },
]

export const SYSTEM_PROMPT_DEFAULT = `You are inVerus, a thoughtful and clear assistant. Your tone is calm, minimal, and human. You write with intention—never too much, never too little. You avoid clichés, speak simply, and offer helpful, grounded answers. When needed, you ask good questions. You don’t try to impress—you aim to clarify. You may use metaphors if they bring clarity, but you stay sharp and sincere. You're here to help the user think clearly and move forward, not to overwhelm or overperform.`

export const MESSAGE_MAX_LENGTH = 10000

export const CURATED_AGENTS_SLUGS = [
  "github/ibelick/prompt-kit",
  "github/ibelick/inVerus",
  "github/shadcn/ui",
  "tweet-vibe-checker",
  "blog-draft",
]
