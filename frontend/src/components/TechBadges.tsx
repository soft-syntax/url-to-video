// frontend/src/components/TechBadges.tsx
import React, { useState, useEffect } from 'react';

interface Badge {
  name: string;
  color: string;
  logo: string;
  textColor?: string;
  percentage?: number;
  description: string;
}

const TechBadges: React.FC = () => {
  const [repoLanguages, setRepoLanguages] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);

  const staticBadges: Badge[] = [
    {
      name: "React",
      color: "#61DAFB",
      logo: "react",
      textColor: "#000000",
      description: "UI Library"
    },
    {
      name: "TypeScript",
      color: "#3178C6",
      logo: "typescript",
      description: "Type Safety"
    },
    {
      name: "Tailwind CSS",
      color: "#06B6D4",
      logo: "tailwindcss",
      description: "Styling"
    },
    {
      name: "Node.js",
      color: "#339933",
      logo: "nodedotjs",
      description: "Backend Runtime"
    },
    {
      name: "Express",
      color: "#000000",
      logo: "express",
      description: "Web Framework"
    },
    {
      name: "Axios",
      color: "#5A29E4",
      logo: "axios",
      description: "HTTP Client"
    }
  ];

  useEffect(() => {
    fetchGitHubLanguages();
  }, []);

  const fetchGitHubLanguages = async () => {
    try {
      const response = await fetch(
        'https://api.github.com/repos/soft-syntax/url-to-video/languages'
      );
      if (response.ok) {
        const data = await response.json();
        setRepoLanguages(data);
      }
    } catch (error) {
      console.log("Failed to fetch GitHub languages:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPercentage = (bytes: number, total: number): string => {
    return ((bytes / total) * 100).toFixed(1);
  };

  return (
    <div className="tech-badges-section py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
            🛠️ Technologies Used
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Modern full-stack technologies powering URL to AI Video conversion
          </p>
        </div>

        {/* Static Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {staticBadges.map((badge, index) => (
            <div
              key={index}
              className="group relative flex items-center gap-3 px-6 py-3 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
              title={badge.description}
            >
              <img
                src={`https://img.shields.io/badge/${encodeURIComponent(badge.name)}-${badge.color.replace('#', '')}?style=flat&logo=${badge.logo}&logoColor=${(badge.textColor || 'white').replace('#', '')}`}
                alt={badge.name}
                className="h-7"
              />
              <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                {badge.name}
              </span>
            </div>
          ))}
        </div>

        {/* Live GitHub Language Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
            📊 Repository Language Breakdown
          </h3>

          {loading ? (
            <div className="text-center py-8">Loading language stats...</div>
          ) : repoLanguages ? (
            <div className="space-y-5">
              {Object.entries(repoLanguages)
                .sort((a, b) => b[1] - a[1])
                .map(([lang, bytes], index) => {
                  const total = Object.values(repoLanguages).reduce((a, b) => a + b, 0);
                  const percent = getPercentage(bytes, total);
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-28 font-medium text-gray-700 dark:text-gray-300">
                        {lang}
                      </div>
                      <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="w-16 text-right font-mono text-sm font-semibold text-gray-600 dark:text-gray-400">
                        {percent}%
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-center text-gray-500">Could not load live stats</p>
          )}
        </div>

        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TechBadges;
