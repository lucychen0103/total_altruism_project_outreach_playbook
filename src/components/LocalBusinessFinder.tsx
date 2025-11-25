import React, { useState, useEffect } from 'react';
import { MapPin, Search, Download, AlertTriangle, TrendingUp, Building2, Phone, Globe, Star, DollarSign } from 'lucide-react';

interface Business {
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface UsageStats {
  creditsUsed: number;
  creditsRemaining: number;
  searchesThisMonth: number;
  lastResetDate: string;
}

const LocalBusinessFinder: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [maxResults, setMaxResults] = useState(50);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [usageStats, setUsageStats] = useState<UsageStats>({
    creditsUsed: 0,
    creditsRemaining: 5.00,
    searchesThisMonth: 0,
    lastResetDate: new Date().toISOString().split('T')[0]
  });

  // Load usage stats from localStorage on component mount
  useEffect(() => {
    const savedStats = localStorage.getItem('apify_usage_stats');
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      // Check if we need to reset monthly stats
      const today = new Date().toISOString().split('T')[0];
      const lastReset = new Date(stats.lastResetDate);
      const currentDate = new Date(today);
      
      // Reset if it's a new month
      if (currentDate.getMonth() !== lastReset.getMonth() || currentDate.getFullYear() !== lastReset.getFullYear()) {
        const resetStats = {
          creditsUsed: 0,
          creditsRemaining: 5.00,
          searchesThisMonth: 0,
          lastResetDate: today
        };
        setUsageStats(resetStats);
        localStorage.setItem('apify_usage_stats', JSON.stringify(resetStats));
      } else {
        setUsageStats(stats);
      }
    }
  }, []);

  const estimatedCost = Math.min(maxResults * 0.01, 1.00); // Rough estimate: $0.01 per result, max $1 per search

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !location.trim()) return;

    // Check if user has enough credits
    if (estimatedCost > usageStats.creditsRemaining) {
      setError(`This search would cost ~$${estimatedCost.toFixed(2)} but you only have $${usageStats.creditsRemaining.toFixed(2)} remaining this month.`);
      return;
    }

    setIsLoading(true);
    setError('');
    setBusinesses([]);

    try {
      const apiToken = import.meta.env.VITE_APIFY_API_TOKEN;
      if (!apiToken) {
        throw new Error('Apify API token not configured. Please add VITE_APIFY_API_TOKEN to your environment variables.');
      }

      // Start the scraper
      const runResponse = await fetch('https://api.apify.com/v2/acts/compass/google-maps-scraper/runs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          searchStringsArray: [`${searchQuery} near ${location}`],
          maxCrawledPlacesPerSearch: maxResults,
          language: 'en',
          countryCode: 'US'
        })
      });

      if (!runResponse.ok) {
        throw new Error(`Apify API error: ${runResponse.status} ${runResponse.statusText}`);
      }

      const runData = await runResponse.json();
      const runId = runData.data.id;

      // Poll for results
      let attempts = 0;
      const maxAttempts = 30; // 5 minutes timeout
      let results: Business[] = [];

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
        
        const resultsResponse = await fetch(`https://api.apify.com/v2/acts/compass/google-maps-scraper/runs/${runId}/dataset/items`, {
          headers: {
            'Authorization': `Bearer ${apiToken}`
          }
        });

        if (resultsResponse.ok) {
          const data = await resultsResponse.json();
          if (data && data.length > 0) {
            results = data.map((item: any) => ({
              name: item.title || item.name || 'Unknown Business',
              address: item.address || item.location || 'Address not available',
              phone: item.phone || item.phoneNumber,
              website: item.website || item.url,
              rating: item.rating || item.stars,
              reviewCount: item.reviewsCount || item.reviews,
              category: item.categoryName || item.type,
              coordinates: item.coordinates ? {
                lat: item.coordinates.lat,
                lng: item.coordinates.lng
              } : undefined
            }));
            break;
          }
        }
        
        attempts++;
      }

      if (results.length === 0) {
        throw new Error('No results found or search timed out. Try a more specific query or smaller result limit.');
      }

      setBusinesses(results);
      
      // Update usage stats
      const newStats = {
        ...usageStats,
        creditsUsed: usageStats.creditsUsed + estimatedCost,
        creditsRemaining: usageStats.creditsRemaining - estimatedCost,
        searchesThisMonth: usageStats.searchesThisMonth + 1
      };
      setUsageStats(newStats);
      localStorage.setItem('apify_usage_stats', JSON.stringify(newStats));

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    if (businesses.length === 0) return;

    const headers = ['Name', 'Address', 'Phone', 'Website', 'Rating', 'Review Count', 'Category'];
    const csvContent = [
      headers.join(','),
      ...businesses.map(business => [
        `"${business.name.replace(/"/g, '""')}"`,
        `"${business.address.replace(/"/g, '""')}"`,
        business.phone || '',
        business.website || '',
        business.rating || '',
        business.reviewCount || '',
        business.category || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `businesses_${location.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getUsageColor = () => {
    const percentUsed = (usageStats.creditsUsed / 5.00) * 100;
    if (percentUsed < 50) return 'text-green-600';
    if (percentUsed < 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-500 p-3 rounded-xl">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Local Business Finder</h3>
          <p className="text-gray-600">Discover local businesses for sponsorship opportunities</p>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Credits Remaining</span>
          </div>
          <div className={`text-2xl font-bold ${getUsageColor()}`}>
            ${usageStats.creditsRemaining.toFixed(2)}
          </div>
          <div className="text-xs text-gray-600">of $5.00 monthly</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-1">
            <Search className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Searches This Month</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {usageStats.searchesThisMonth}
          </div>
          <div className="text-xs text-gray-600">searches completed</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Est. Search Cost</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            ${estimatedCost.toFixed(2)}
          </div>
          <div className="text-xs text-gray-600">for {maxResults} results</div>
        </div>
      </div>

      {/* Optimization Tips */}
      <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500 mb-6">
        <h3 className="font-bold text-blue-900 mb-3">💡 Free Tier Optimization Tips</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span className="text-gray-700">
              <strong>Be Specific:</strong> "Corporate headquarters downtown Seattle" vs "businesses Seattle"
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span className="text-gray-700">
              <strong>Target High-Value:</strong> Focus on businesses most likely to sponsor (Fortune 500, tech companies, etc.)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span className="text-gray-700">
              <strong>Export Immediately:</strong> Download CSV after each search to build your database
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span className="text-gray-700">
              <strong>Monthly Planning:</strong> Plan searches for maximum impact with limited credits
            </span>
          </li>
        </ul>
      </div>

      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Type/Query <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., corporate headquarters, tech companies, restaurants"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Seattle WA, downtown San Diego"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Results: {maxResults} (Est. Cost: ${estimatedCost.toFixed(2)})
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={maxResults}
            onChange={(e) => setMaxResults(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10 (Budget-friendly)</span>
            <span>100 (Max recommended)</span>
          </div>
        </div>

        {estimatedCost > usageStats.creditsRemaining && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-800">Insufficient Credits</h4>
                <p className="text-red-700 text-sm mt-1">
                  This search would cost ~${estimatedCost.toFixed(2)} but you only have ${usageStats.creditsRemaining.toFixed(2)} remaining. 
                  Try reducing the result limit or wait until next month.
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !searchQuery.trim() || !location.trim() || estimatedCost > usageStats.creditsRemaining}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            isLoading || !searchQuery.trim() || !location.trim() || estimatedCost > usageStats.creditsRemaining
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Searching businesses...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              Find Local Businesses
            </span>
          )}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-800">Search Error</h4>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {businesses.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900">
              Found {businesses.length} businesses:
            </h4>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-4 font-medium text-gray-700">Business Name</th>
                  <th className="text-left p-4 font-medium text-gray-700">Address</th>
                  <th className="text-left p-4 font-medium text-gray-700">Contact</th>
                  <th className="text-center p-4 font-medium text-gray-700">Rating</th>
                  <th className="text-left p-4 font-medium text-gray-700">Category</th>
                </tr>
              </thead>
              <tbody>
                {businesses.map((business, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{business.name}</div>
                    </td>
                    
                    <td className="p-4">
                      <span className="text-sm text-gray-700">{business.address}</span>
                    </td>
                    
                    <td className="p-4">
                      <div className="space-y-1">
                        {business.phone && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            {business.phone}
                          </div>
                        )}
                        {business.website && (
                          <div className="flex items-center gap-1 text-sm">
                            <Globe className="w-3 h-3 text-gray-400" />
                            <a
                              href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 truncate max-w-32"
                            >
                              {business.website.replace(/^https?:\/\//, '')}
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="p-4 text-center">
                      {business.rating && (
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{business.rating}</span>
                          {business.reviewCount && (
                            <span className="text-xs text-gray-500">({business.reviewCount})</span>
                          )}
                        </div>
                      )}
                    </td>
                    
                    <td className="p-4">
                      {business.category && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {business.category}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Results Summary */}
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">📊 Search Results Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-medium text-green-800">Businesses Found</div>
                <div className="text-green-700">{businesses.length}</div>
              </div>
              <div>
                <div className="font-medium text-green-800">With Websites</div>
                <div className="text-green-700">{businesses.filter(b => b.website).length}</div>
              </div>
              <div>
                <div className="font-medium text-green-800">With Phone Numbers</div>
                <div className="text-green-700">{businesses.filter(b => b.phone).length}</div>
              </div>
              <div>
                <div className="font-medium text-green-800">Credits Used</div>
                <div className="text-green-700">${estimatedCost.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-6 space-y-4">
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-bold text-yellow-900 mb-2">🎯 Next Steps for Sponsorship Outreach</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Export business list to CSV for your records</li>
            <li>• Research decision-makers on LinkedIn using business names</li>
            <li>• Use the Email Finder to get specific contact emails</li>
            <li>• Focus on businesses with websites (shows digital presence)</li>
            <li>• Prioritize highly-rated businesses (shows community engagement)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocalBusinessFinder;