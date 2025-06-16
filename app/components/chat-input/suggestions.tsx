"use client"

import { PromptSuggestion } from "@/components/prompt-kit/prompt-suggestion"
import { TRANSITION_SUGGESTIONS } from "@/lib/motion"
import { motion } from "motion/react"
import React, { memo, useCallback, useMemo, useState, useEffect } from "react"
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
  const [selectedSuggestions, setSelectedSuggestions] = useState<Set<string>>(new Set())

  // Auto-generate template when selections change
  useEffect(() => {
    if (selectedSuggestions.size === 0) {
      onValueChange("")
      return
    }
    
    const selectedLabels = Array.from(selectedSuggestions)
    const placeholderText = selectedLabels
      .map(label => `${label}: `)
      .join(' ')
    
    onValueChange(placeholderText)
  }, [selectedSuggestions, onValueChange])

  const handleSuggestionToggle = useCallback(
    (suggestion: { label: string; prompt: string }) => {
      setSelectedSuggestions(prev => {
        const newSet = new Set(prev)
        if (newSet.has(suggestion.label)) {
          newSet.delete(suggestion.label)
        } else {
          newSet.add(suggestion.label)
        }
        return newSet
      })
    },
    []
  )

  const suggestionsGrid = useMemo(
    () => (
      <motion.div
        key="suggestions-grid"
        className="flex w-full max-w-full flex-nowrap justify-start gap-2 overflow-x-auto px-2 pt-4 md:mx-auto md:max-w-2xl md:flex-wrap md:justify-center md:pl-0"
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0, y: 10, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        transition={TRANSITION_SUGGESTIONS}
        style={{
          scrollbarWidth: "none",
        }}
      >
        {SUGGESTIONS_CONFIG.map((suggestion, index) => {
          const isSelected = selectedSuggestions.has(suggestion.label)
          return (
            <MotionPromptSuggestion
              key={suggestion.label}
              onClick={() => handleSuggestionToggle(suggestion)}
              className={`capitalize cursor-pointer transition-all ${
                isSelected 
                  ? 'ring-2 ring-inset ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              initial="initial"
              animate="animate"
              transition={{
                ...TRANSITION_SUGGESTIONS,
                delay: index * 0.02,
              }}
              variants={{
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
              }}
            >
              <suggestion.icon className={`size-4 ${isSelected ? 'text-blue-600 dark:text-blue-400' : ''}`} />
              {suggestion.label}
            </MotionPromptSuggestion>
          )
        })}
      </motion.div>
    ),
    [selectedSuggestions, handleSuggestionToggle]
  )

  return suggestionsGrid
})
