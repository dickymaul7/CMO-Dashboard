const initialDashboardData = {
  teams: [
    { id: 'pure-glow', name: 'Pure Glow', logo: '✨' },
    { id: 'skin-bliss', name: 'Skin Bliss', logo: '🧴' },
    { id: 'clari-glow', name: 'Clari Glow', logo: '🌟' }
  ],
  activeTeam: 'pure-glow',
  
  // Real-time Metrics by Channel and Brand
  metrics: {
    'pure-glow': {
      overview: {
        totalSales: 40650.20,
        salesChange: 18,
        totalProfit: 15486.80,
        profitChange: -14,
        advertisingCosts: 2982.60,
        adsChange: 16,
        salesTarget: 60540.00,
        targetActual: 48250.00,
        salesTrend: [30000, 31000, 28000, 42000, 38000, 40650],
        targetTrend: [35000, 32000, 20000, 22000, 18000, 48250],
        profitAndLoss: {
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          revenue: [25000, 18000, 22000, 15000, 32000, 24000],
          expense: [12000, 10000, 14000, 9000, 16000, 11000]
        },
        productSales: [
          { store: 'Store A', value: 1560, color: '#4F46E5' },
          { store: 'Store B', value: 2420, color: '#6366F1' },
          { store: 'Store C', value: 1980, color: '#F97316' }
        ],
        influencerReach: [
          { name: 'Sarah J.', reach: '120k', engagement: '4.8%', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
          { name: 'David K.', reach: '85k', engagement: '5.2%', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
          { name: 'Elena R.', reach: '210k', engagement: '3.9%', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
          { name: 'Ahmad Z.', reach: '95k', engagement: '6.1%', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }
        ],
        socialDistribution: [
          { platform: 'Tiktok', followers: '556k', percentage: 48.60, logo: 'tiktok' },
          { platform: 'Instagram', followers: '238k', percentage: 36.20, logo: 'instagram' },
          { platform: 'Facebook', followers: '145k', percentage: 24.80, logo: 'facebook' }
        ]
      },
      social: {
        facebook: {
          followers: 12483,
          followerChange: 1001,
          comments: 1505,
          likes: 29982
        },
        instagram: {
          followers: 15629,
          followerChange: 1571,
          comments: 141,
          likes: 20
        },
        top3Konten: [
          {
            rank: 1,
            title: '17996904671988718,17841464530048605,proxsis.academ...',
            platform: 'instagram',
            likes: 3,
            comments: 1,
            shares: 3,
            impressions: 27,
            image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=150'
          },
          {
            rank: 2,
            title: 'Bagi perusahaan',
            platform: 'instagram',
            likes: 2,
            comments: 1,
            shares: 3,
            impressions: 26,
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150'
          },
          {
            rank: 3,
            title: 'Karena di era AI dan transformasi digital',
            platform: 'instagram',
            likes: 2,
            comments: 2,
            shares: 5,
            impressions: 38,
            image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=150'
          }
        ],
        engagement: {
          instagram: {
            likes: 7,
            comments: 141,
            shares: 1416,
            saves: 2816,
            impressions: 281360,
            reach: 203200,
            postViews: 234484,
            trend: [2116, 2150, 2200, 2180, 2250, 2300],
            change: '+3,478'
          },
          facebook: {
            likes: 29982,
            comments: 1505,
            shares: 842,
            saves: 104,
            impressions: 156200,
            reach: 112400,
            postViews: 125600,
            trend: [10500, 11200, 12100, 11800, 12400, 12500],
            change: '+1,200'
          }
        }
      },
      ads: {
        totalSpend: 2982.60,
        roas: 2.8,
        cpc: 0.45,
        ctr: 2.15,
        platforms: [
          { name: 'Meta Ads', spend: 1450.00, revenue: 4350.00, roas: 3.0, ctr: 2.4, cpc: 0.38, status: 'Active' },
          { name: 'Google Ads', spend: 1032.60, revenue: 2581.50, roas: 2.5, ctr: 1.8, cpc: 0.52, status: 'Active' },
          { name: 'TikTok Ads', spend: 500.00, revenue: 1400.00, roas: 2.8, ctr: 2.2, cpc: 0.48, status: 'Active' }
        ]
      },
      seo: {
        organicTraffic: '45.2k',
        trafficChange: '+12.4%',
        keywordsTop10: 245,
        keywordsChange: '+18',
        domainAuthority: 42,
        siteHealth: 88,
        topKeywords: [
          { keyword: 'brightening serum', position: 2, volume: '18k/mo', trend: 'up' },
          { keyword: 'skin barrier repair', position: 4, volume: '12k/mo', trend: 'up' },
          { keyword: 'skincare aman bumil', position: 1, volume: '8.4k/mo', trend: 'flat' }
        ]
      },
      crm: {
        emailList: '58.4k',
        listChange: '+6.8%',
        openRate: '24.5%',
        openRateChange: '+2.1%',
        ctrRate: '3.8%',
        ctrChange: '+0.5%',
        campaigns: [
          { name: 'Welcome Journey', sent: 12400, openRate: '48.2%', clickRate: '8.5%', revenue: 6200 },
          { name: 'July Promo Sale', sent: 45000, openRate: '18.4%', clickRate: '2.5%', revenue: 15400 },
          { name: 'Win-back Campaign', sent: 8000, openRate: '21.0%', clickRate: '3.1%', revenue: 3200 }
        ]
      }
    },
    'skin-bliss': {
      overview: {
        totalSales: 31200.50,
        salesChange: 12,
        totalProfit: 11400.00,
        profitChange: 8,
        advertisingCosts: 4100.00,
        adsChange: 22,
        salesTarget: 45000.00,
        targetActual: 38000.00,
        salesTrend: [22000, 24000, 25000, 28000, 29000, 31200],
        targetTrend: [30000, 30000, 30000, 35000, 35000, 38000],
        profitAndLoss: {
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          revenue: [20000, 22000, 24000, 26000, 28000, 31200],
          expense: [11000, 12000, 13000, 15000, 17000, 19800]
        },
        productSales: [
          { store: 'Store A', value: 2100, color: '#4F46E5' },
          { store: 'Store B', value: 1200, color: '#6366F1' },
          { store: 'Store C', value: 1600, color: '#F97316' }
        ],
        influencerReach: [
          { name: 'Valerie T.', reach: '310k', engagement: '4.2%', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
          { name: 'Keanu R.', reach: '420k', engagement: '3.1%', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }
        ],
        socialDistribution: [
          { platform: 'Tiktok', followers: '340k', percentage: 55.00, logo: 'tiktok' },
          { platform: 'Instagram', followers: '210k', percentage: 34.00, logo: 'instagram' },
          { platform: 'Facebook', followers: '68k', percentage: 11.00, logo: 'facebook' }
        ]
      },
      social: {
        facebook: {
          followers: 8420,
          followerChange: 420,
          comments: 820,
          likes: 12400
        },
        instagram: {
          followers: 11200,
          followerChange: 840,
          comments: 92,
          likes: 15
        },
        top3Konten: [
          {
            rank: 1,
            title: 'Skincare tips untuk kulit kering & kusam',
            platform: 'instagram',
            likes: 12,
            comments: 4,
            shares: 8,
            impressions: 120,
            image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=150'
          },
          {
            rank: 2,
            title: 'Moisturizer ceramide promo flash sale',
            platform: 'instagram',
            likes: 9,
            comments: 2,
            shares: 4,
            impressions: 95,
            image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=150'
          },
          {
            rank: 3,
            title: 'Kenapa skin barrier bisa rusak?',
            platform: 'instagram',
            likes: 8,
            comments: 3,
            shares: 7,
            impressions: 88,
            image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=150'
          }
        ],
        engagement: {
          instagram: {
            likes: 15,
            comments: 92,
            shares: 842,
            saves: 1120,
            impressions: 145000,
            reach: 98000,
            postViews: 112000,
            trend: [1200, 1300, 1400, 1380, 1450, 1500],
            change: '+1,200'
          },
          facebook: {
            likes: 12400,
            comments: 820,
            shares: 610,
            saves: 42,
            impressions: 89000,
            reach: 67000,
            postViews: 74000,
            trend: [5000, 5200, 5600, 5400, 5800, 6000],
            change: '+600'
          }
        }
      },
      ads: {
        totalSpend: 4100.00,
        roas: 2.1,
        cpc: 0.58,
        ctr: 1.90,
        platforms: [
          { name: 'Meta Ads', spend: 2500.00, revenue: 5250.00, roas: 2.1, ctr: 1.8, cpc: 0.55, status: 'Active' },
          { name: 'Google Ads', spend: 1600.00, revenue: 3360.00, roas: 2.1, ctr: 2.0, cpc: 0.62, status: 'Active' }
        ]
      },
      seo: {
        organicTraffic: '28.1k',
        trafficChange: '+5.6%',
        keywordsTop10: 115,
        keywordsChange: '+4',
        domainAuthority: 38,
        siteHealth: 92,
        topKeywords: [
          { keyword: 'moisturizer kulit sensitif', position: 3, volume: '22k/mo', trend: 'up' },
          { keyword: 'pelembab ceramide', position: 8, volume: '15k/mo', trend: 'down' }
        ]
      },
      crm: {
        emailList: '34.2k',
        listChange: '+4.5%',
        openRate: '21.2%',
        openRateChange: '+1.5%',
        ctrRate: '3.1%',
        ctrChange: '-0.2%',
        campaigns: [
          { name: 'Welcome Autoresponder', sent: 6800, openRate: '44.5%', clickRate: '7.8%', revenue: 2100 },
          { name: 'Flash Sale August', sent: 32000, openRate: '16.5%', clickRate: '2.1%', revenue: 9800 }
        ]
      }
    }
  },
  
  // Recommendations and Step-by-Step AI Execution Code/Logs
  recommendations: [
    // --- ADS RECOMMENDATIONS ---
    {
      id: 'rec-ads-1',
      channel: 'ads',
      title: 'Optimize Google Ads Bidding Strategy & Pause Wasteful Keywords',
      description: 'Ad campaign "Search_Brand_Serum" has 14 search terms consuming 35% budget without any conversions in the last 14 days.',
      impact: 'Reduces spend by $210/week & increases Search ROAS by 18%',
      status: 'pending', // pending, running, completed
      actionText: 'Execute Bidding & Negative Keywords Fix',
      changes: {
        adsChange: -5,
        totalSales: +850,
        revenueImpact: 850,
        spendImpact: -210
      },
      steps: [
        'Connecting to Google Ads API Gateway (v16.1)...',
        'Authentication successful under Developer Token DevToken_ID_74932.',
        'Loading active Search Campaigns for Account ID: 582-990-2131 (Pure Glow)...',
        'Analysing Keyword Performance Report for campaign: "Search_Brand_Serum"...',
        'Detected high-cost, zero-conversion keywords: \n  - "serum kecantikan murah sekali" (Cost: $124.50, Conversions: 0)\n  - "cara membuat serum sendiri" (Cost: $85.50, Conversions: 0)\n  - "brand skincare artis viral" (Cost: $68.20, Conversions: 0)',
        'Applying negativity rules: Creating negative keywords in Ad Group: "Brand_Serum_Core"...',
        'API execution: POST /v16/customers/5829902131/campaignSharedSets - Success.',
        'Added 3 search terms as Exact Negative Keywords.',
        'Analyzing bidding strategy for Campaign "Search_Brand_Serum" (Current: Manual CPC).',
        'Determined that historical conversion volume (50+ in 30 days) satisfies "Maximize Conversions" pre-requisite.',
        'Updating campaign bidding strategy to Smart Bidding [Maximize Conversions] with target CPA of $12.00.',
        'API execution: PATCH /v16/customers/5829902131/campaigns/campaign_id_883011 - Success.',
        'Recalculating Google Ads expected spend. Daily cap optimized from $75/day to $55/day.',
        'Notifying marketing team Slack webhook #cmo-alerts: "Google Ads campaign Search_Brand_Serum optimized by AI Agent. 3 Negative Keywords added. Smart Bidding activated."',
        'Execution completed successfully! Dashboard metrics updated.'
      ]
    },
    {
      id: 'rec-ads-2',
      channel: 'ads',
      title: 'Adjust Meta Ads Budget Allocation for AdSet: "Broad_LAL_3%"',
      description: 'AdSet "Retargeting_Website_Visitors" has hit a plateau with ROAS dropping to 1.1x, while "Broad_LAL_3%" is operating at 4.2x ROAS. We recommend shifting 30% of the daily budget.',
      impact: 'Increases conversion rate by 12.5% and improves Meta Ads ROAS from 3.0 to 3.4',
      status: 'pending',
      actionText: 'Redistribute Meta Ads Budget',
      changes: {
        totalSales: +1850,
        revenueImpact: 1850,
        spendImpact: 0,
        roasChange: +0.4
      },
      steps: [
        'Initializing Facebook Graph SDK (v19.0)...',
        'Authenticating system user with Page & Ad Account Admin tokens...',
        'Fetching Adset metrics for Ad Account act_738491023 (Pure Glow)...',
        'AdSet "Retargeting_Website_Visitors" (ID: 23859239841) - Spend: $500, Purchase Value: $550 (ROAS: 1.1).',
        'AdSet "Broad_LAL_3%" (ID: 23859239845) - Spend: $350, Purchase Value: $1470 (ROAS: 4.2).',
        'Formulating budget adjustment plan: Shifting $45/day from Retargeting to LAL_3%.',
        'API request: POST graph.facebook.com/v19.0/23859239841 (Setting daily_budget to $105.00)...',
        'API response: {"success": true}. Retargeting budget decreased.',
        'API request: POST graph.facebook.com/v19.0/23859239845 (Setting daily_budget to $195.00)...',
        'API response: {"success": true}. Broad_LAL_3% budget increased.',
        'Analyzing overlap coefficients. Overlap is safe (less than 12%).',
        'Triggering automated email report: Sent to cmo-reports@pureglow.co.',
        'Meta Ads optimization completed. Budgets rebalanced.'
      ]
    },

    // --- SOCIAL RECOMMENDATIONS ---
    {
      id: 'rec-social-1',
      channel: 'social',
      title: 'Schedule Trending Audio Remake for Tiktok',
      description: 'TikTok audio "Night_Bloom_Lofi" is trending with beauty creators (+150% video creations in 48 hours). Our competitor is using it. We suggest staging a product review draft using this audio.',
      impact: 'Potential reach boost of 80k - 120k views on next upload',
      status: 'pending',
      actionText: 'Draft & Stage TikTok Post',
      changes: {
        totalFollowers: '+1.5k',
        engagementChange: '+0.4%'
      },
      steps: [
        'Connecting to TikTok Creator Search & Trend API...',
        'Trend identified: "Night_Bloom_Lofi" (ID: trend_snd_88301) - Velocity: 8.5x.',
        'Scanning local media library for pre-approved product clips...',
        'Found video asset: "pureglow_serum_textures_4k.mp4" (22 seconds).',
        'Generating optimized copywriting caption with AI Copywriter...',
        'Suggested Caption: "Kulit kusam minggat pas denger lagu ini? 👀 Serum Brightening kita udah ready nemenin night routine kamu! ✨ #glowup #fyp #aestheticscare #skinsolved"',
        'Staging draft on TikTok Creator Platform (Account: @pureglow.official)...',
        'API Request: POST /v2/post/publish/creator/video/draft - uploading asset & metadata...',
        'TikTok server response: {"draft_id": "draft_tk_2048572", "status": "staged"}',
        'Pushing mobile notification to Brand Manager\'s phone: "Your TikTok draft is staged. Open TikTok App to approve and publish."',
        'Tiktok trending audio setup complete!'
      ]
    },
    {
      id: 'rec-social-2',
      channel: 'social',
      title: 'Auto-reply to unanswered Instagram comments',
      description: 'There are 42 Instagram comments on our latest post asking "Berapa harganya?" and "Bisa dipakai ibu hamil?". Auto-responding using natural language increases engagement.',
      impact: 'Improves response time by 92% and boosts Post Engagement rate by 2.2%',
      status: 'pending',
      actionText: 'Run Instagram Auto-Responder',
      changes: {
        engagementChange: '+0.8%'
      },
      steps: [
        'Accessing Meta Webhook Receiver for Instagram Messaging API...',
        'Scanning comments on latest Media ID: 180293049182390...',
        'Found 42 unresolved comments in the last 24 hours.',
        'Invoking AI Language Model to generate contextual replies:',
        '  - "Berapa harganya?" -> "Hai kak! Serum Brightening harganya Rp149.000, tapi lagi diskon jadi Rp129.000 di Shopee kami! Link ada di bio ya! 🥰"',
        '  - "Bisa dipakai ibu hamil?" -> "Hai kak! Produk Pure Glow diformulasikan bebas paraben dan merkuri sehingga sangat aman untuk ibu hamil & menyusui! 🤰✨"',
        'Executing Instagram Comment API calls...',
        'API Request: POST /v19.0/180293049182390/replies (Replied to User @anisa_w)...',
        'API Request: POST /v19.0/180293049182390/replies (Replied to User @chika_l)...',
        '... [Batch processing 40 more comments] ...',
        'Successfully replied to all 42 comments.',
        'Logging interaction stats in dashboard database.',
        'Instagram auto-responder task finished.'
      ]
    },

    // --- SEO RECOMMENDATIONS ---
    {
      id: 'rec-seo-1',
      channel: 'seo',
      title: 'Fix Image Alt Tags & Compress Top 10 High-Weight Banner Images',
      description: '5 high-traffic blog pages take more than 4.2 seconds to load on mobile due to uncompressed PNG assets. They also lack alt tags, hurting search visibility.',
      impact: 'Boosts Site Speed Score to 95/100, estimated +8% organic traffic boost',
      status: 'pending',
      actionText: 'Optimize Site Images & Alt Tags',
      changes: {
        siteHealth: +6,
        organicTraffic: '+3.5k'
      },
      steps: [
        'Accessing site repository via SFTP/Git deployment hook...',
        'Scanning directory: /public/assets/images/banners/...',
        'Identified large assets:',
        '  - "hero-banner-large.png" (Size: 4.8MB) - No Alt Tag',
        '  - "product-set-detail.png" (Size: 3.2MB) - No Alt Tag',
        'Downloading images to local AI processing workspace...',
        'Running lossless WebP compression (Quality: 80%)...',
        '  - Compressed "hero-banner-large.png" -> "hero-banner-large.webp" (Size: 320KB, -93%)',
        '  - Compressed "product-set-detail.png" -> "product-set-detail.webp" (Size: 240KB, -92%)',
        'Uploading WebP assets and updating index.html/components path references...',
        'Generating contextual Alt Tags via Visual AI Analyzer:',
        '  - hero-banner-large: "Model wanita menggunakan Serum Pure Glow dengan kulit bercahaya"',
        '  - product-set-detail: "Rangkaian produk skincare lengkap Pure Glow, Brightening Serum, Toner, dan Moisturizer"',
        'Modifying HTML/React source files to append alt attributes...',
        'Purging CDN Cache (Cloudflare API request: POST /zones/purge_cache)...',
        'Running Lighthouse speed audit test. Mobile Load Speed: 1.8 seconds (Saved 2.4s).',
        'SEO Image Assets optimization complete!'
      ]
    },
    {
      id: 'rec-seo-2',
      channel: 'seo',
      title: 'Rewrite Meta Descriptions for Top 3 Declining Keywords',
      description: 'Search impressions for "serum anti aging terbaik" are high but CTR has dropped from 4.8% to 1.9%. Rewriting dynamic meta descriptions will improve search CTR.',
      impact: 'Projected +25% organic visits for targeted keywords',
      status: 'pending',
      actionText: 'Rewrite SEO Meta Tags',
      changes: {
        keywordsChange: +6
      },
      steps: [
        'Fetching Google Search Console performance data for keyword: "serum anti aging terbaik"...',
        'Confirmed drop in Click-Through Rate despite stable average position #4.',
        'Extracting current Meta Description: "Beli serum anti aging kami untuk kulit glowing. Harga murah kualitas terjamin."',
        'Generating persuasive search-intent matched Meta Description with AI:',
        '  - New Description: "Mencari serum anti aging terbaik? Kandungan retinol & peptides Pure Glow terbukti menyamarkan kerutan dalam 14 hari. Cek selengkapnya!"',
        'Updating database metadata router (CMS: WordPress Rest API / WP-JSON)...',
        'API Request: POST /wp-json/wp/v2/posts/1852 (Updating meta tag yoast_head)...',
        'Yoast SEO settings updated successfully.',
        'Submitting URL for re-indexing in Google Search Console API...',
        'GSC API response: {"indexingStatus": "INDEXING_REQUESTED"}',
        'Meta description rewrite finalized.'
      ]
    },

    // --- CRM RECOMMENDATIONS ---
    {
      id: 'rec-crm-1',
      channel: 'crm',
      title: 'Optimize Abandoned Cart Email Workflow Timings',
      description: 'Current email automation fires 24 hours after checkout abandonment. Industry best practice shows 1 hour delay yields 3x conversion rates.',
      impact: 'Projected +18% recovery rate ($2,400+ additional monthly revenue)',
      status: 'pending',
      actionText: 'Update CRM Automation Timing',
      changes: {
        totalSales: +1200,
        revenueImpact: 1200,
        ctrRate: '+0.8%'
      },
      steps: [
        'Connecting to Klaviyo CRM REST API...',
        'Authenticating Private API Key ending in "...73a9"...',
        'Querying active Flow ID: flow_7739281 ("Abandoned Cart Recovery")...',
        'Found trigger: "Checkout Started" -> Wait: 24 Hours -> Send Email #1.',
        'Modifying CRM trigger timing nodes in database schema...',
        'API Request: PUT /v2/flow/flow_7739281/action-nodes/node_99321...',
        'Timing updated: Wait delay changed from "24 hours" to "1 hour".',
        'Running A/B split configuration on Email #1 Subject Line:',
        '  - Subject A (Control): "Kamu melupakan sesuatu di keranjang!"',
        '  - Subject B (Challenger): "Keranjangmu nungguin lho! Diskon 10% ini mau hangus ⏳"',
        'Setting up 50/50 traffic weight split on Klaviyo flow editor.',
        'Testing CRM payload hook: Triggering mock checkout abandonment test - Success.',
        'CRM Flow optimized successfully!'
      ]
    },
    {
      id: 'rec-crm-2',
      channel: 'crm',
      title: 'Segment Cold Leads into Re-engagement Win-back Campaign',
      description: 'We have 12,400 subscribers who haven\'t opened an email in 90 days. Keeping them in the main broadcast drops email deliverability and sender score.',
      impact: 'Cleanses email list, boosts overall Open Rate to 28% and protects domain reputation',
      status: 'pending',
      actionText: 'Execute Re-engagement Segmentation',
      changes: {
        openRate: '+3.5%',
        emailList: '-2.1k'
      },
      steps: [
        'Accessing ActiveCampaign CRM Database...',
        'Running SQL Query to compile list of cold subscribers: LastOpenDate > 90 days ago...',
        'Compiled list: 12,411 subscriber records found.',
        'Creating new CRM List: "Cold_Leads_90_Days" (List ID: list_09382)...',
        'API Request: POST /api/3/lists - Success.',
        'Moving 12,411 contacts from "Main_Newsletter_List" to "Cold_Leads_90_Days"...',
        'Processing bulk contact tags... Batch [1/3] complete, Batch [2/3] complete, Batch [3/3] complete.',
        'Attaching Automated Win-back email sequence to "Cold_Leads_90_Days" (Featuring dynamic 20% coupon code).',
        'Configuring exclusion rule on weekly newsletters: Exclude contacts in "Cold_Leads_90_Days".',
        'CRM segmentation and deliverability shield completed!'
      ]
    }
  ]
};

// Expose data globally for access by dashboard scripts
window.dashboardData = initialDashboardData;
