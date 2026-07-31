"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { DottedSurface } from '@/components/ui/DottedSurface'

interface Song {
  id: string
  title: string
  artist: string
  albumArt: string
  spotifyUrl: string
}

interface Stat {
  label: string
  value: string
  color: 'red' | 'blue' | 'purple'
}

const defaultSongs: Song[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    spotifyUrl: "#"
  },
  {
    id: "2",
    title: "Someone You Loved",
    artist: "Lewis Capaldi",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273fc2101e6889d6ce9025f85f2",
    spotifyUrl: "#"
  },
  {
    id: "3",
    title: "Shape of You",
    artist: "Ed Sheeran",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
    spotifyUrl: "#"
  },
  {
    id: "4",
    title: "Starboy",
    artist: "The Weeknd",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
    spotifyUrl: "#"
  },
  {
    id: "5",
    title: "Levitating",
    artist: "Dua Lipa",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273be841ba4bc24340152e3a79a",
    spotifyUrl: "#"
  },
  {
    id: "6",
    title: "Save Your Tears",
    artist: "The Weeknd",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    spotifyUrl: "#"
  }
]

const stats: Stat[] = [
  { label: "bouldering", value: "v4", color: "red" },
  { label: "deadlift", value: "190 kg", color: "red" },
  { label: "high jump", value: "147 cm", color: "blue" },
  { label: "last trek", value: "Kashmir Great Lakes", color: "blue" },
  { label: "keyboard", value: "QK65", color: "purple" },
  { label: "mouse", value: "Razer Viper V2 Pro", color: "purple" }
]

const getColorClass = (color: 'red' | 'blue' | 'purple') => {
  switch (color) {
    case 'red':
      return { color: '#EF4444' }
    case 'blue':
      return { color: '#3B82F6' }
    case 'purple':
      return { color: '#8B5CF6' }
  }
}

export function PersonalDashboard() {
  const [topSongs, setTopSongs] = useState<Song[]>(defaultSongs)

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        console.log('Fetching top tracks...')
        const response = await fetch('/api/spotify/top-tracks')
        if (response.ok) {
          const data = await response.json()
          console.log('Top tracks received:', data.tracks)
          setTopSongs(data.tracks)
        } else {
          console.error('Failed to fetch tracks:', response.status)
        }
      } catch (error) {
        console.error('Error fetching top tracks:', error)
        // Keep default songs on error
      }
    }

    fetchTopTracks()
  }, [])

  return (
    <div className="w-full bg-white py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden">
      {/* Dotted Surface Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <DottedSurface className="w-full h-full opacity-60" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Top Songs Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-7 md:mb-8"
        >
          {/* Header */}
          <div className="mb-3 sm:mb-4">
            <h2 className="text-black text-lg sm:text-xl md:text-2xl font-bold mb-1.5 flex items-center gap-2">
              Top songs
            </h2>
            <p className="text-gray-600 text-[10px] sm:text-xs">
              my currently playing songs on spotify
            </p>
          </div>

          {/* Song Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {topSongs.map((song, index) => (
              <a
                key={song.id}
                href={song.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(78, 205, 196, 0.2)' }}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 sm:p-3 cursor-pointer transition-all duration-300 hover:bg-gray-100 w-full"
                >
                <div className="flex items-center gap-2 sm:gap-2.5 w-full overflow-hidden">
                  {/* Album Art */}
                  <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 relative">
                    <Image
                      src={song.albumArt}
                      alt={`${song.title} album art`}
                      fill
                      className="rounded-md object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <h3 className="text-black font-bold text-xs sm:text-sm mb-0.5 truncate w-full">
                      {song.title}
                    </h3>
                    <p className="text-gray-600 text-[10px] sm:text-xs truncate w-full">
                      by {song.artist}
                    </p>
                  </div>
                </div>
              </motion.div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Header */}
          <div className="mb-3 sm:mb-4">
            <h2 className="text-black text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-2" style={{ fontFamily: '"Bitcount Grid Single Ink", monospace' }}>
              STATS
            </h2>
          </div>

          {/* Stats List */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 md:p-5" style={{ fontFamily: '"Bitcount Grid Single Ink", monospace' }}>
            <div className="space-y-1.5 sm:space-y-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex justify-between items-center border-b border-gray-200 pb-1.5 sm:pb-2 last:border-b-0 last:pb-0"
                >
                  <span className="text-black text-[10px] sm:text-xs md:text-sm">
                    {stat.label}:
                  </span>
                  <span
                    className="text-[10px] sm:text-xs md:text-sm text-right"
                    style={{
                      ...getColorClass(stat.color),
                      fontWeight: '700',
                      WebkitTextFillColor: getColorClass(stat.color).color
                    }}
                  >
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
