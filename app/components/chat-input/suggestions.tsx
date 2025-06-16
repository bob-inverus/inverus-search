"use client"

import { PromptSuggestion } from "@/components/prompt-kit/prompt-suggestion"
import { TRANSITION_SUGGESTIONS } from "@/lib/motion"
import { AnimatePresence, motion } from "motion/react"
import React, { memo, useCallback, useMemo, useState } from "react"
import { SUGGESTIONS as SUGGESTIONS_CONFIG } from "../../../lib/config"

type SuggestionsProps = {
  onValueChange: (value: string) => void
  onSuggestion: (suggestion: string) => void
  value?: string
}

const MotionPromptSuggestion = motion.create(PromptSuggestion)

export const Suggestions = memo(function Suggestions({
  onValueChange,
  onSuggestion,
  value,
}: SuggestionsProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedFields, setSelectedFields] = useState<string[]>([])

  if (!value && activeCategory !== null) {
    setActiveCategory(null)
  }

  const handleSuggestionClick = useCallback(
    (suggestion: { label: string; prompt: string }) => {
      const fieldName = suggestion.label
      let newQuery = value || ""
      
      // Toggle field selection
      const isSelected = selectedFields.includes(fieldName)
      let newSelectedFields: string[]
      
      if (isSelected) {
        // Remove field from selection
        newSelectedFields = selectedFields.filter(field => field !== fieldName)
        // Remove from query
        const fieldRegex = new RegExp(`\\b${fieldName}:\\s*[^\\s,]*[,\\s]*`, 'gi')
        newQuery = newQuery.replace(fieldRegex, '').trim()
      } else {
        // Add field to selection
        newSelectedFields = [...selectedFields, fieldName]
        // Add to query
        if (newQuery && !newQuery.endsWith(' ')) {
          newQuery += ' '
        }
        newQuery += `${fieldName}: `
      }
      
      setSelectedFields(newSelectedFields)
      onValueChange(newQuery)
      onSuggestion(newQuery)
    },
    [selectedFields, value, onValueChange, onSuggestion]
  )

  const suggestionsGrid = useMemo(
    () => (
      <motion.div
        key="suggestions-grid"
        className="grid w-full max-w-full grid-cols-3 gap-2 px-2 md:mx-auto md:max-w-2xl md:grid-cols-6 md:gap-3 md:px-0"
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0, y: 10, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        transition={TRANSITION_SUGGESTIONS}
      >
        {SUGGESTIONS_CONFIG.slice(0, 6).map((suggestion, index) => {
          const isSelected = selectedFields.includes(suggestion.label)
          return (
            <MotionPromptSuggestion
              key={suggestion.label}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`capitalize text-center transition-all duration-200 ${
                isSelected 
                  ? 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/30 dark:border-blue-600 dark:text-blue-200' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              initial="initial"
              animate="animate"
              transition={{
                ...TRANSITION_SUGGESTIONS,
                delay: index * 0.05,
              }}
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 10 },
                animate: { opacity: 1, scale: 1, y: 0 },
              }}
            >
              <div className="flex flex-col items-center gap-1 p-2">
                <suggestion.icon className="size-4 md:size-5" />
                <span className="text-xs md:text-sm font-medium">{suggestion.label}</span>
              </div>
            </MotionPromptSuggestion>
          )
        })}
      </motion.div>
    ),
    [handleSuggestionClick, selectedFields]
  )

  return (
    <AnimatePresence mode="wait">
      {suggestionsGrid}
    </AnimatePresence>
  )
})
