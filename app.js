// CMO Dashboard Main Application Script

document.addEventListener('DOMContentLoaded', () => {
  // --- STATE ---
  let activeTeam = window.dashboardData.activeTeam;
  let activePage = 'overview';
  
  // Charts instances
  let pnlChartInstance = null;
  let satChartInstance = null;
  let socialEngagementChartInstance = null;
  let activeSocialPlatform = 'instagram';
  
  // Terminal execution state
  let currentRec = null;
  let executionInterval = null;
  
  // Dynamic channel stores
  let customChannels = [];

  // Initialize Lucide icons
  lucide.createIcons();

  // --- INITIALIZE UI CONTROLS ---
  setupTeamDropdown();
  setupSidebarNavigation();
  setupModalControls();
  setupRefreshControl();
  setupSocialControls();
  
  // Initial render
  renderDashboard();

  // --- FUNCTIONS: NAVIGATION & SIDEBAR ---
  
  function setupTeamDropdown() {
    const btn = document.getElementById('teamSelectorBtn');
    const menu = document.getElementById('teamDropdownMenu');
    
    // Toggle dropdown
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('active');
    });
    
    // Close dropdown on click outside
    document.addEventListener('click', () => {
      menu.classList.remove('active');
    });
    
    renderTeamDropdownOptions();
  }
  
  function renderTeamDropdownOptions() {
    const menu = document.getElementById('teamDropdownMenu');
    menu.innerHTML = '';
    
    window.dashboardData.teams.forEach(team => {
      const option = document.createElement('div');
      option.className = `team-option ${team.id === activeTeam ? 'active' : ''}`;
      option.innerHTML = `
        <span class="team-logo">${team.logo}</span>
        <span class="team-name">${team.name}</span>
      `;
      option.addEventListener('click', () => {
        switchTeam(team.id);
      });
      menu.appendChild(option);
    });
    
    // Add "Add New Team" option at the bottom
    const addTeamBtn = document.createElement('div');
    addTeamBtn.className = 'team-option add-team-btn';
    addTeamBtn.innerHTML = `
      <span class="team-logo"><i data-lucide="plus" style="width:16px;height:16px;"></i></span>
      <span class="team-name">Add New Team</span>
    `;
    addTeamBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const newName = prompt("Enter new team name:");
      if (newName) {
        const newId = newName.toLowerCase().replace(/\s+/g, '-');
        const logos = ['⚡', '🧴', '🌟', '💅', '💧', '🌿'];
        const randomLogo = logos[Math.floor(Math.random() * logos.length)];
        
        // Add to team list
        window.dashboardData.teams.push({ id: newId, name: newName, logo: randomLogo });
        
        // Clone data of pure-glow for mock data
        window.dashboardData.metrics[newId] = JSON.parse(JSON.stringify(window.dashboardData.metrics['pure-glow']));
        
        // Render dropdown options
        renderTeamDropdownOptions();
        
        // Switch to the newly created team
        switchTeam(newId);
      }
    });
    menu.appendChild(addTeamBtn);
    lucide.createIcons({ attrs: { class: 'lucide-custom' } });
  }
  
  function switchTeam(teamId) {
    activeTeam = teamId;
    window.dashboardData.activeTeam = teamId;
    
    const team = window.dashboardData.teams.find(t => t.id === teamId);
    document.getElementById('activeTeamLogo').innerText = team.logo;
    document.getElementById('activeTeamName').innerText = team.name;
    
    // Refresh options to set active class
    renderTeamDropdownOptions();
    
    // Rerender active views with new team metrics
    renderDashboard();
  }
  
  function setupSidebarNavigation() {
    const listItems = document.querySelectorAll('#sidebarMenuList .menu-item');
    
    listItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.getAttribute('data-page');
        navigateToPage(page);
      });
    });
  }
  
  function navigateToPage(page) {
    activePage = page;
    
    // Update active state in sidebar
    const listItems = document.querySelectorAll('#sidebarMenuList .menu-item');
    listItems.forEach(item => {
      if (item.getAttribute('data-page') === page) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // Switch active class in viewports
    const viewports = document.querySelectorAll('.page-view');
    viewports.forEach(view => {
      view.classList.remove('active');
    });
    
    // Check if dynamic custom page
    const isCustom = customChannels.some(ch => ch.id === page);
    
    if (isCustom) {
      const customView = document.getElementById('page-custom-template');
      customView.classList.add('active');
      renderCustomPage(page);
    } else {
      const targetView = document.getElementById(`page-${page}`);
      if (targetView) targetView.classList.add('active');
      
      // Update Header Titles
      const title = document.getElementById('mainPageTitle');
      const subtitle = document.getElementById('mainPageSubtitle');
      
      if (page === 'overview') {
        title.innerText = 'Overview';
        subtitle.innerText = 'Sales & Marketing Performance Dashboard';
      } else if (page === 'social') {
        title.innerText = 'Social Media';
        subtitle.innerText = 'Social Accounts & Influencer Performance';
      } else if (page === 'ads') {
        title.innerText = 'Ads & Paid';
        subtitle.innerText = 'Ad Account ROAS & Spend Metrics';
      } else if (page === 'seo') {
        title.innerText = 'SEO Optimization';
        subtitle.innerText = 'Organic Search Rankings & Site Audits';
      } else if (page === 'crm') {
        title.innerText = 'CRM & Email';
        subtitle.innerText = 'Audience Lists & Automation Performance';
      }
    }
    
    renderDashboard();
  }

  // --- DYNAMIC CUSTOM MENU SYSTEM ---
  
  const addMenuBtn = document.getElementById('addCustomMenuBtn');
  const addMenuModal = document.getElementById('addMenuModalOverlay');
  const closeAddMenuBtn = document.getElementById('closeAddMenuBtn');
  const cancelAddMenuBtn = document.getElementById('cancelAddMenuBtn');
  const saveCustomMenuBtn = document.getElementById('saveCustomMenuBtn');
  
  addMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addMenuModal.classList.add('active');
  });
  
  closeAddMenuBtn.addEventListener('click', () => addMenuModal.classList.remove('active'));
  cancelAddMenuBtn.addEventListener('click', () => addMenuModal.classList.remove('active'));
  
  saveCustomMenuBtn.addEventListener('click', () => {
    const name = document.getElementById('newMenuName').value.trim();
    const icon = document.getElementById('newMenuIcon').value;
    const kpi = document.getElementById('newMenuKPI').value.trim();
    const kpiVal = document.getElementById('newMenuKPIVal').value.trim();
    
    if (!name || !kpi || !kpiVal) {
      alert("Please fill in all inputs before creating the channel.");
      return;
    }
    
    const pageId = name.toLowerCase().replace(/\s+/g, '-');
    
    // Add item to Custom Channel list
    customChannels.push({ id: pageId, name, icon, kpi, kpiVal });
    
    // Insert into sidebar navigation before the Add Custom Channel button
    const menuList = document.getElementById('sidebarMenuList');
    const newLi = document.createElement('li');
    newLi.className = 'menu-item';
    newLi.setAttribute('data-page', pageId);
    newLi.innerHTML = `
      <a href="#">
        <span class="menu-item-left">
          <i data-lucide="${icon}"></i>
          ${name}
        </span>
        <i data-lucide="chevron-right" class="chevron" style="width: 14px; height: 14px;"></i>
      </a>
    `;
    
    newLi.addEventListener('click', (e) => {
      e.preventDefault();
      navigateToPage(pageId);
    });
    
    menuList.appendChild(newLi);
    lucide.createIcons();
    
    // Add custom metric elements inside active brand
    window.dashboardData.teams.forEach(t => {
      if (!window.dashboardData.metrics[t.id][pageId]) {
        window.dashboardData.metrics[t.id][pageId] = {
          kpiLabel: kpi,
          kpiValue: kpiVal,
          change: '+5%',
          activityLog: 'Initiated dynamic workspace monitoring for brand ' + t.name
        };
      }
    });
    
    // Close modal & reset inputs
    addMenuModal.classList.remove('active');
    document.getElementById('newMenuName').value = '';
    document.getElementById('newMenuKPI').value = '';
    document.getElementById('newMenuKPIVal').value = '';
    
    // Navigate to new page automatically
    navigateToPage(pageId);
  });

  // --- RENDER ROUTER ---
  
  function renderDashboard() {
    const brandData = window.dashboardData.metrics[activeTeam];
    if (!brandData) return;
    
    if (activePage === 'overview') {
      renderOverview(brandData.overview);
    } else if (activePage === 'social') {
      renderSocial(brandData.social);
    } else if (activePage === 'ads') {
      renderAds(brandData.ads);
    } else if (activePage === 'seo') {
      renderSEO(brandData.seo);
    } else if (activePage === 'crm') {
      renderCRM(brandData.crm);
    }
  }

  // --- PAGE RENDERING MODULES ---
  
  function renderOverview(data) {
    // Metric cards values
    document.getElementById('ovSalesValue').innerText = formatCurrency(data.totalSales);
    document.getElementById('ovProfitValue').innerText = formatCurrency(data.totalProfit);
    document.getElementById('ovAdsValue').innerText = formatCurrency(data.advertisingCosts);
    
    // Badges classes
    setBadgeTrend('ovSalesChange', data.salesChange);
    setBadgeTrend('ovProfitChange', data.profitChange);
    setBadgeTrend('ovAdsChange', data.adsChange);
    
    // Product Sales list
    const productList = document.getElementById('productSaleList');
    productList.innerHTML = '';
    const maxVal = Math.max(...data.productSales.map(p => p.value));
    
    data.productSales.forEach(item => {
      const percentage = (item.value / maxVal) * 100;
      const div = document.createElement('div');
      div.className = 'product-sale-item';
      div.innerHTML = `
        <div class="product-sale-meta">
          <span>${item.store}</span>
          <span style="color: ${item.color}">${formatCurrency(item.value)}</span>
        </div>
        <div class="product-bar-container">
          <div class="product-bar" style="width: ${percentage}%; background-color: ${item.color}"></div>
          <span class="product-bar-value">${item.value} units</span>
        </div>
      `;
      productList.appendChild(div);
    });
    
    // Influencer List
    const influencerList = document.getElementById('influencerList');
    influencerList.innerHTML = '';
    data.influencerReach.forEach(inf => {
      const div = document.createElement('div');
      div.className = 'influencer-item';
      div.innerHTML = `
        <div class="influencer-profile">
          <img src="${inf.avatar}" alt="${inf.name}" class="influencer-img">
          <div>
            <div class="influencer-name">${inf.name}</div>
            <div class="influencer-reach">Reach: ${inf.reach}</div>
          </div>
        </div>
        <div class="influencer-stats">
          <span class="influencer-eng">${inf.engagement}</span>
          <span class="influencer-eng-lbl">Engagement</span>
        </div>
      `;
      influencerList.appendChild(div);
    });
    
    // Social Distribution
    const socialList = document.getElementById('socialDistList');
    socialList.innerHTML = '';
    data.socialDistribution.forEach(soc => {
      const div = document.createElement('div');
      div.className = 'social-dist-item';
      div.innerHTML = `
        <div class="social-dist-left">
          <div class="social-platform-icon ${soc.logo}">
            <i data-lucide="${soc.logo === 'facebook' ? 'facebook' : soc.logo === 'instagram' ? 'instagram' : 'music'}"></i>
          </div>
          <div class="social-dist-details">
            <span class="social-dist-name">${soc.platform}</span>
            <span class="social-dist-followers">${soc.followers}</span>
          </div>
        </div>
        <div class="social-dist-middle">
          <div class="dist-bar-bg">
            <div class="dist-bar-fill" style="width: ${soc.percentage}%; background-color: ${soc.logo === 'tiktok' ? '#000000' : soc.logo === 'instagram' ? '#DC2743' : '#1877F2'}"></div>
          </div>
        </div>
        <div class="social-dist-right">${soc.percentage.toFixed(2)}%</div>
      `;
      socialList.appendChild(div);
    });
    
    lucide.createIcons();
    
    // Draw Charts
    renderCharts(data);
  }
  
  function renderSocial(data) {
    // 1. Overview connected accounts card rendering
    document.getElementById('fbFollowersVal').innerText = data.facebook.followers.toLocaleString();
    document.getElementById('fbFollowersChange').innerText = '+' + data.facebook.followerChange.toLocaleString();
    document.getElementById('fbCommentsVal').innerText = data.facebook.comments.toLocaleString();
    document.getElementById('fbLikesVal').innerText = data.facebook.likes.toLocaleString();

    document.getElementById('igFollowersVal').innerText = data.instagram.followers.toLocaleString();
    document.getElementById('igFollowersChange').innerText = '+' + data.instagram.followerChange.toLocaleString();
    document.getElementById('igCommentsVal').innerText = data.instagram.comments.toLocaleString();
    document.getElementById('igLikesVal').innerText = data.instagram.likes.toLocaleString();

    // 2. Top 3 Konten rendering
    const topContentList = document.getElementById('topContentList');
    topContentList.innerHTML = '';
    data.top3Konten.forEach(item => {
      const div = document.createElement('div');
      div.className = 'top-content-item';
      div.innerHTML = `
        <div class="top-content-rank rank-${item.rank}">#${item.rank}</div>
        <div class="top-content-thumbnail-container">
          <img src="${item.image}" alt="" class="top-content-thumbnail">
          <div class="top-content-platform-icon">
            <i data-lucide="${item.platform === 'instagram' ? 'instagram' : 'facebook'}" style="width: 10px; height: 10px;"></i>
          </div>
        </div>
        <div class="top-content-details">
          <div class="top-content-title" title="${item.title}">${item.title}</div>
          <div class="top-content-platform-label">Instagram</div>
          <div class="top-content-metrics-row">
            <span class="content-metric"><i data-lucide="heart" style="fill: var(--danger); color: var(--danger);"></i> ${item.likes}</span>
            <span class="content-metric"><i data-lucide="message-square"></i> ${item.comments}</span>
            <span class="content-metric"><i data-lucide="share-2"></i> ${item.shares}</span>
            <span class="content-metric"><i data-lucide="eye"></i> ${item.impressions}</span>
          </div>
        </div>
      `;
      topContentList.appendChild(div);
    });

    // 3. Render social engagement details and chart
    renderSocialEngagement(data);

    // 4. Load recommendations
    renderRecommendationsList('social', 'socialRecommendationsGrid');
    lucide.createIcons();
  }

  function renderSocialEngagement(data) {
    const activeData = data.engagement[activeSocialPlatform];
    
    // Update breakdown values
    document.getElementById('ebLikes').innerText = activeData.likes.toLocaleString();
    document.getElementById('ebComments').innerText = activeData.comments.toLocaleString();
    document.getElementById('ebShares').innerText = activeData.shares.toLocaleString();
    document.getElementById('ebSaves').innerText = activeData.saves.toLocaleString();
    document.getElementById('ebImpressions').innerText = activeData.impressions.toLocaleString();
    document.getElementById('ebReach').innerText = activeData.reach.toLocaleString();
    document.getElementById('ebViews').innerText = activeData.postViews.toLocaleString();

    // Update glowing pill inside chart overlay
    document.getElementById('engagementChartPill').innerText = activeData.change;

    // Draw Line Chart using Chart.js
    const ctx = document.getElementById('socialEngagementChart');
    if (ctx) {
      if (socialEngagementChartInstance) socialEngagementChartInstance.destroy();
      
      const isIg = activeSocialPlatform === 'instagram';
      const lineColor = isIg ? '#EC4899' : '#1877F2';
      const bgColor = isIg ? 'rgba(236, 72, 153, 0.1)' : 'rgba(24, 119, 242, 0.1)';

      socialEngagementChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          datasets: [{
            label: isIg ? 'Instagram Engagement' : 'Facebook Engagement',
            data: activeData.trend,
            borderColor: lineColor,
            backgroundColor: bgColor,
            fill: true,
            tension: 0.3,
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: lineColor
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: { grid: { display: false } },
            y: {
              grid: { color: '#F1F5F9' },
              ticks: {
                callback: value => {
                  if (value >= 1000) {
                    return (value / 1000).toFixed(1) + 'k';
                  }
                  return value;
                }
              }
            }
          }
        }
      });
    }
  }
  
  function renderAds(data) {
    document.getElementById('adTotalSpend').innerText = formatCurrency(data.totalSpend);
    document.getElementById('adRoas').innerText = `${data.roas.toFixed(1)}x`;
    document.getElementById('adCpc').innerText = formatCurrency(data.cpc);
    document.getElementById('adCtr').innerText = `${data.ctr.toFixed(2)}%`;
    
    // Ads Table
    const tbody = document.getElementById('adsTableBody');
    tbody.innerHTML = '';
    data.platforms.forEach(plat => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${plat.name}</strong></td>
        <td>${formatCurrency(plat.spend)}</td>
        <td>${formatCurrency(plat.revenue)}</td>
        <td><span style="font-weight:700;color:var(--primary);">${plat.roas.toFixed(1)}x</span></td>
        <td>${plat.ctr.toFixed(2)}%</td>
        <td>${formatCurrency(plat.cpc)}</td>
        <td>
          <span class="status-indicator ${plat.status.toLowerCase() === 'active' ? 'active' : 'paused'}">
            ${plat.status}
          </span>
        </td>
      `;
      tbody.appendChild(tr);
    });
    
    // Load recommendations
    renderRecommendationsList('ads', 'adsRecommendationsGrid');
  }
  
  function renderSEO(data) {
    document.getElementById('seoTraffic').innerText = data.organicTraffic;
    document.getElementById('seoKeywords').innerText = data.keywordsTop10;
    document.getElementById('seoDomainAuth').innerText = data.domainAuthority;
    document.getElementById('seoHealth').innerText = `${data.siteHealth}/100`;
    
    setBadgeTrend('seoTrafficChange', parseFloat(data.trafficChange));
    setBadgeTrend('seoKeywordsChange', parseInt(data.keywordsChange));
    
    // Keywords Table
    const tbody = document.getElementById('seoKeywordsTableBody');
    tbody.innerHTML = '';
    data.topKeywords.forEach(kw => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${kw.keyword}</strong></td>
        <td>Position #${kw.position}</td>
        <td>${kw.volume}</td>
        <td>
          <i data-lucide="${kw.trend === 'up' ? 'arrow-up-right' : kw.trend === 'down' ? 'arrow-down-right' : 'minus'}" 
             style="color: ${kw.trend === 'up' ? 'var(--success)' : kw.trend === 'down' ? 'var(--danger)' : 'var(--text-light)'}"></i>
        </td>
      `;
      tbody.appendChild(tr);
    });
    lucide.createIcons();
    
    // Load recommendations
    renderRecommendationsList('seo', 'seoRecommendationsGrid');
  }
  
  function renderCRM(data) {
    document.getElementById('crmSubscribers').innerText = data.emailList;
    document.getElementById('crmOpenRate').innerText = data.openRate;
    document.getElementById('crmCtr').innerText = data.ctrRate;
    
    setBadgeTrend('crmSubscribersChange', parseFloat(data.listChange));
    setBadgeTrend('crmOpenRateChange', parseFloat(data.openRateChange));
    setBadgeTrend('crmCtrChange', parseFloat(data.ctrChange));
    
    // Campaigns Table
    const tbody = document.getElementById('crmCampaignsTableBody');
    tbody.innerHTML = '';
    data.campaigns.forEach(c => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${c.name}</strong></td>
        <td>${c.sent.toLocaleString()} sent</td>
        <td>${c.openRate}</td>
        <td>${c.clickRate}</td>
        <td><strong style="color:var(--success);">${formatCurrency(c.revenue)}</strong></td>
      `;
      tbody.appendChild(tr);
    });
    
    // Load recommendations
    renderRecommendationsList('crm', 'crmRecommendationsGrid');
  }
  
  function renderCustomPage(pageId) {
    const brandData = window.dashboardData.metrics[activeTeam];
    const customData = brandData[pageId];
    
    // Update Header
    const customChan = customChannels.find(ch => ch.id === pageId);
    document.getElementById('mainPageTitle').innerText = customChan.name;
    document.getElementById('mainPageSubtitle').innerText = `Dynamic Campaign Optimization Center for ${customChan.name}`;
    
    const grid = document.getElementById('customMetricsGrid');
    grid.innerHTML = `
      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-title">${customData.kpiLabel}</span>
          <i data-lucide="${customChan.icon}" style="color: var(--primary);"></i>
        </div>
        <div class="metric-value-row">
          <span class="metric-value">${customData.kpiValue}</span>
          <span class="trend-badge up">${customData.change}</span>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-header">
          <span class="metric-title">Integrations Status</span>
          <i data-lucide="check-circle-2" style="color: var(--success);"></i>
        </div>
        <div class="metric-value-row" style="margin-top: 14px;">
          <span class="status-indicator active" style="font-size: 1.25rem;">CONNECTED & HEALTHY</span>
        </div>
      </div>
    `;
    document.getElementById('customWidgetTitle').innerText = `${customChan.name} - Activity Logs`;
    lucide.createIcons();
  }

  // --- RECOMMENDATIONS RENDERER ---
  
  function renderRecommendationsList(channel, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    // Filter recommendations by active channel
    const list = window.dashboardData.recommendations.filter(r => r.channel === channel);
    
    if (list.length === 0) {
      container.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);">No optimization improvements generated for this section.</p>`;
      return;
    }
    
    list.forEach(rec => {
      const card = document.createElement('div');
      card.className = `recommendation-card ${rec.status}`;
      card.id = `card-${rec.id}`;
      
      const statusIcon = rec.status === 'completed' ? 'check-circle' : rec.status === 'running' ? 'loader' : 'circle';
      const statusText = rec.status.charAt(0).toUpperCase() + rec.status.slice(1);
      
      card.innerHTML = `
        <div class="rec-badge-row">
          <span class="rec-channel-badge ${rec.channel}">${rec.channel}</span>
          <span class="rec-status-badge ${rec.status}">
            <i data-lucide="${statusIcon}" class="${rec.status === 'running' ? 'spin' : ''}" style="width:14px;height:14px;"></i>
            <span>${statusText}</span>
          </span>
        </div>
        <h4 class="rec-title">${rec.title}</h4>
        <p class="rec-desc">${rec.description}</p>
        <div class="rec-impact-card">
          <i data-lucide="trending-up"></i>
          <span class="rec-impact-text"><strong>Projected Impact:</strong> ${rec.impact}</span>
        </div>
        <button class="rec-action-btn" id="btn-${rec.id}" ${rec.status !== 'pending' ? 'disabled' : ''}>
          <i data-lucide="bot"></i>
          <span>${rec.status === 'completed' ? 'Fix Applied' : rec.status === 'running' ? 'Agent Working...' : rec.actionText}</span>
        </button>
      `;
      
      // Bind execution trigger
      const btn = card.querySelector(`#btn-${rec.id}`);
      btn.addEventListener('click', () => {
        triggerAIExecution(rec);
      });
      
      container.appendChild(card);
    });
    
    lucide.createIcons();
  }

  // --- CHART.JS CONTROLS ---
  
  function renderCharts(overviewData) {
    // 1. Profit & Loss Bar Chart
    const pnlCtx = document.getElementById('profitAndLossChart');
    if (pnlCtx) {
      if (pnlChartInstance) pnlChartInstance.destroy();
      
      pnlChartInstance = new Chart(pnlCtx, {
        type: 'bar',
        data: {
          labels: overviewData.profitAndLoss.labels,
          datasets: [
            {
              label: 'Revenue',
              data: overviewData.profitAndLoss.revenue,
              backgroundColor: '#4F46E5', // Indigo
              borderRadius: 6,
              borderSkipped: false
            },
            {
              label: 'Expense',
              data: overviewData.profitAndLoss.expense,
              backgroundColor: '#F97316', // Orange
              borderRadius: 6,
              borderSkipped: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { font: { family: 'Plus Jakarta Sans', weight: 600 } }
            }
          },
          scales: {
            x: { grid: { display: false } },
            y: {
              grid: { color: '#F1F5F9' },
              ticks: { callback: value => '$' + value.toLocaleString() }
            }
          }
        }
      });
    }
    
    // 2. Sales and Target Overtime Line Chart
    const satCtx = document.getElementById('salesAndTargetChart');
    if (satCtx) {
      if (satChartInstance) satChartInstance.destroy();
      
      satChartInstance = new Chart(satCtx, {
        type: 'line',
        data: {
          labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Total Sales',
              data: overviewData.salesTrend,
              borderColor: '#4F46E5',
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              fill: true,
              tension: 0.4,
              borderWidth: 3
            },
            {
              label: 'Total Target',
              data: overviewData.targetTrend,
              borderColor: '#F97316',
              backgroundColor: 'transparent',
              fill: false,
              borderDash: [5, 5],
              tension: 0.4,
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { font: { family: 'Plus Jakarta Sans', weight: 600 } }
            }
          },
          scales: {
            x: { grid: { display: false } },
            y: {
              grid: { color: '#F1F5F9' },
              ticks: { callback: value => '$' + value.toLocaleString() }
            }
          }
        }
      });
    }
  }

  // --- AGENTIC AI EXECUTION PANEL MECHANICS ---
  
  const termOverlay = document.getElementById('terminalModalOverlay');
  const abortBtn = document.getElementById('abortBtn');
  const approveRunBtn = document.getElementById('approveRunBtn');
  const closeTermBtn = document.getElementById('closeTerminalBtn');
  const shell = document.getElementById('terminalShell');
  const progressContainer = document.getElementById('terminalProgressContainer');
  const progressFill = document.getElementById('terminalProgressFill');
  const progressPct = document.getElementById('terminalProgressPct');
  
  function setupModalControls() {
    closeTermBtn.addEventListener('click', () => {
      if (currentRec && currentRec.status === 'running') {
        alert("Execution is currently running. Please abort before closing.");
        return;
      }
      termOverlay.classList.remove('active');
      clearInterval(executionInterval);
    });
    
    abortBtn.addEventListener('click', () => {
      if (executionInterval) {
        clearInterval(executionInterval);
        appendTerminalLine('System halted by user command. Aborting processes...', 'error');
        currentRec.status = 'pending';
        
        // Reset buttons states
        approveRunBtn.disabled = false;
        approveRunBtn.innerHTML = `<i data-lucide="play" style="width:16px;height:16px;"></i><span>Approve & Run Fix</span>`;
        lucide.createIcons();
        progressContainer.classList.remove('active');
        abortBtn.disabled = true;
        
        // Redraw list to clear states
        renderDashboard();
      } else {
        termOverlay.classList.remove('active');
      }
    });
  }
  
  function triggerAIExecution(rec) {
    currentRec = rec;
    
    // Set headers text in terminal
    document.getElementById('termRecTitle').innerText = rec.title;
    document.getElementById('termRecDesc').innerText = rec.description;
    document.getElementById('termRecImpact').innerText = rec.impact;
    
    // Reset Terminal view
    shell.innerHTML = `
      <div class="terminal-line cmd">run-optimization --id=${rec.id} --brand=${activeTeam}</div>
      <div class="terminal-line info">Connection established with Brand Node ${activeTeam.toUpperCase()}.</div>
      <div class="terminal-line info">Waiting for manual validation to commence automated API operations.</div>
    `;
    
    // Show buttons
    approveRunBtn.style.display = 'flex';
    approveRunBtn.disabled = false;
    approveRunBtn.innerHTML = `<i data-lucide="play" style="width:16px;height:16px;"></i><span>Approve & Run Fix</span>`;
    
    progressContainer.classList.remove('active');
    progressFill.style.width = '0%';
    progressPct.innerText = '0%';
    
    abortBtn.disabled = false;
    abortBtn.innerText = 'Cancel';
    
    // Open terminal modal overlay
    termOverlay.classList.add('active');
    lucide.createIcons();
    
    // Bind confirmation trigger
    approveRunBtn.onclick = () => {
      startAgentExecutionLoop(rec);
    };
  }
  
  function startAgentExecutionLoop(rec) {
    rec.status = 'running';
    renderDashboard();
    
    approveRunBtn.disabled = true;
    approveRunBtn.style.display = 'none';
    abortBtn.innerText = 'Abort';
    
    progressContainer.classList.add('active');
    
    let stepIndex = 0;
    const totalSteps = rec.steps.length;
    
    appendTerminalLine('User confirmation received. Initiating optimization sequence...', 'info');
    
    executionInterval = setInterval(() => {
      if (stepIndex < totalSteps) {
        const step = rec.steps[stepIndex];
        let colorClass = 'info';
        
        if (step.includes('API') || step.includes('POST') || step.includes('PATCH')) {
          colorClass = 'cmd';
        } else if (step.includes('Success') || step.includes('success') || step.includes('completed')) {
          colorClass = 'success';
        } else if (step.includes('Error') || step.includes('fail')) {
          colorClass = 'error';
        }
        
        appendTerminalLine(step, colorClass);
        
        // Scroll shell
        shell.scrollTop = shell.scrollHeight;
        
        // Update progress bar
        stepIndex++;
        const percent = Math.floor((stepIndex / totalSteps) * 100);
        progressFill.style.width = `${percent}%`;
        progressPct.innerText = `${percent}%`;
        
      } else {
        // FINISHED SIMULATION Successfully
        clearInterval(executionInterval);
        rec.status = 'completed';
        
        // Modify metrics values based on the recommendation changes properties
        applyImpactModifications(rec.changes);
        
        // Update UI View and save state
        renderDashboard();
        
        appendTerminalLine('[SYSTEM] agentic optimization routine finished. Output status: SUCCESS.', 'success');
        shell.scrollTop = shell.scrollHeight;
        
        // Trigger alert icon status updates
        progressContainer.classList.remove('active');
        abortBtn.innerText = 'Close Drawer';
        
        alert("AI Agent successfully applied optimization fixes! Dashboard values updated.");
      }
    }, 1500); // 1.5 seconds delay between logs to simulate network requests
  }
  
  function appendTerminalLine(text, type) {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.innerText = text;
    shell.appendChild(line);
  }
  
  function applyImpactModifications(changes) {
    if (!changes) return;
    
    const brandOverview = window.dashboardData.metrics[activeTeam].overview;
    const brandAds = window.dashboardData.metrics[activeTeam].ads;
    const brandSeo = window.dashboardData.metrics[activeTeam].seo;
    const brandCrm = window.dashboardData.metrics[activeTeam].crm;
    
    // Sales and expenses adjustments
    if (changes.totalSales) {
      brandOverview.totalSales += changes.totalSales;
    }
    if (changes.spendImpact) {
      brandOverview.advertisingCosts += changes.spendImpact;
    }
    
    // Ads specifics
    if (changes.adsChange) {
      brandOverview.advertisingCosts += (brandOverview.advertisingCosts * (changes.adsChange / 100));
    }
    if (changes.roasChange) {
      brandAds.roas += changes.roasChange;
    }
    
    // SEO specifics
    if (changes.siteHealth) {
      brandSeo.siteHealth += changes.siteHealth;
      if (brandSeo.siteHealth > 100) brandSeo.siteHealth = 100;
    }
    if (changes.organicTraffic) {
      brandSeo.organicTraffic = (parseFloat(brandSeo.organicTraffic) + parseFloat(changes.organicTraffic)).toFixed(1) + 'k';
    }
    if (changes.keywordsChange) {
      brandSeo.keywordsTop10 += changes.keywordsChange;
    }
    
    // CRM specifics
    if (changes.openRate) {
      brandCrm.openRate = (parseFloat(brandCrm.openRate) + parseFloat(changes.openRate)).toFixed(1) + '%';
    }
    if (changes.ctrRate) {
      brandCrm.ctrRate = (parseFloat(brandCrm.ctrRate) + parseFloat(changes.ctrRate)).toFixed(1) + '%';
    }
    if (changes.emailList) {
      brandCrm.emailList = (parseFloat(brandCrm.emailList) + parseFloat(changes.emailList)).toFixed(1) + 'k';
    }
  }

  // --- REFRESH ACTIONS ---
  
  function setupRefreshControl() {
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.addEventListener('click', () => {
      refreshBtn.classList.add('spin-loading');
      setTimeout(() => {
        refreshBtn.classList.remove('spin-loading');
        // Randomly tweak values slightly to simulate real-time updates
        simulateRealtimeFluctuation();
        renderDashboard();
      }, 1000);
    });
  }
  
  function simulateRealtimeFluctuation() {
    const brandOverview = window.dashboardData.metrics[activeTeam].overview;
    const fluctuation = (Math.random() - 0.4) * 100; // slightly positive drift
    brandOverview.totalSales += fluctuation;
    brandOverview.totalProfit += (fluctuation * 0.4);
  }

  function setupSocialControls() {
    // Tab switching buttons
    const tabIgBtn = document.getElementById('tabIgBtn');
    const tabFbBtn = document.getElementById('tabFbBtn');
    const socialOverviewRefreshBtn = document.getElementById('socialOverviewRefreshBtn');
    const socialEngagementRefreshBtn = document.getElementById('socialEngagementRefreshBtn');

    if (tabIgBtn && tabFbBtn) {
      tabIgBtn.addEventListener('click', () => {
        activeSocialPlatform = 'instagram';
        tabIgBtn.classList.add('active');
        tabFbBtn.classList.remove('active');
        const brandData = window.dashboardData.metrics[activeTeam];
        renderSocialEngagement(brandData.social);
      });

      tabFbBtn.addEventListener('click', () => {
        activeSocialPlatform = 'facebook';
        tabFbBtn.classList.add('active');
        tabIgBtn.classList.remove('active');
        const brandData = window.dashboardData.metrics[activeTeam];
        renderSocialEngagement(brandData.social);
      });
    }

    if (socialOverviewRefreshBtn) {
      socialOverviewRefreshBtn.addEventListener('click', () => {
        socialOverviewRefreshBtn.classList.add('spin-loading');
        const refreshedText = document.getElementById('overviewRefreshedText');
        refreshedText.innerText = 'Refreshing...';
        
        setTimeout(() => {
          socialOverviewRefreshBtn.classList.remove('spin-loading');
          refreshedText.innerText = 'Refreshed just now';
          const brandData = window.dashboardData.metrics[activeTeam];
          // Add small fluctuations
          brandData.social.facebook.followers += Math.floor(Math.random() * 15 - 5);
          brandData.social.instagram.followers += Math.floor(Math.random() * 20 - 5);
          renderSocial(brandData.social);
        }, 1000);
      });
    }

    if (socialEngagementRefreshBtn) {
      socialEngagementRefreshBtn.addEventListener('click', () => {
        socialEngagementRefreshBtn.classList.add('spin-loading');
        const refreshedText = document.getElementById('engagementRefreshedText');
        refreshedText.innerText = 'Refreshing...';
        
        setTimeout(() => {
          socialEngagementRefreshBtn.classList.remove('spin-loading');
          refreshedText.innerText = 'Refreshed just now';
          const brandData = window.dashboardData.metrics[activeTeam];
          const activeEng = brandData.social.engagement[activeSocialPlatform];
          
          // Randomly fluctuate breakdown values
          activeEng.likes += Math.floor(Math.random() * 10 - 2);
          activeEng.comments += Math.floor(Math.random() * 5 - 1);
          activeEng.shares += Math.floor(Math.random() * 8 - 2);
          activeEng.saves += Math.floor(Math.random() * 15 - 5);
          
          renderSocialEngagement(brandData.social);
        }, 1000);
      });
    }
  }

  // --- UTILS ---
  
  function formatCurrency(value) {
    return '$' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  
  function setBadgeTrend(elementId, value) {
    const badge = document.getElementById(elementId);
    if (!badge) return;
    
    badge.innerText = (value >= 0 ? '+' : '') + value + '%';
    if (value >= 0) {
      badge.className = 'trend-badge up';
    } else {
      badge.className = 'trend-badge down';
    }
  }
});
