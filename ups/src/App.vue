<template>
  <div class="container">
    <!-- 顶部广告横幅 -->
    <div class="ad-banner top-banner">
      <div class="ad-placeholder">
        <h3>国际物流运费计算器</h3>
        <p>实时比较UPS、DHL、FedEx、EMS四大快递服务</p>
      </div>
    </div>
   <!-- JSON-LD 结构化数据 -->
    <script type="application/ld+json" v-html="structuredData"></script>
    
    <!-- 或者使用更简洁的方式 -->
    <script type="application/ld+json">
      {
        "@context": "https://shipping-fee-mu.vercel.app/",
        "@type": "WebApplication",
        "name": "国际运费计算器",
        "description": "免费在线计算UPS、DHL、FedEx、EMS国际快递运费与时效",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    </script>

    <!-- 主标题区域 -->
    <header class="main-header">
      <div class="header-content">
        <div class="logo-area">
          <h1 class="main-title">🌍 国际运费与时效综合计算器</h1>
          <p class="main-subtitle">一站式比较UPS、DHL、FedEx、EMS四大国际快递的费用与时效，包含所有附加费</p>
        </div>
        <div class="header-info">
          <div class="info-card">
            <div class="info-icon">⚡</div>
            <div class="info-text">
              <h4>实时费率</h4>
              <p>基于最新运费表</p>
            </div>
          </div>
          <div class="info-card">
            <div class="info-icon">📊</div>
            <div class="info-text">
              <h4>完整费用</h4>
              <p>包含所有附加费</p>
            </div>
          </div>
          <div class="info-card">
            <div class="info-icon">⏱️</div>
            <div class="info-text">
              <h4>时效预估</h4>
              <p>精确到工作日</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域：三列布局 -->
    <main class="main-content">
      <!-- 左侧：表单输入区域 -->
      <section class="input-section">
        <div class="section-header">
          <h2 class="section-title">1. 填写货运详细信息</h2>
          <p class="section-desc">输入包裹详情以获取四大快递的精确报价</p>
        </div>
        
        <div class="form-container">
          <!-- 发货地与目的地 -->
          <div class="form-section-card">
            <h3 class="form-subtitle">📍 地点信息</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="fromCountry">发货国家</label>
                <select id="fromCountry" v-model="form.fromCountry">
                  <option v-for="country in countries" :value="country.code" :key="country.code">
                    {{ country.name }} ({{ country.code }})
                  </option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="fromCity">发货城市</label>
                <input id="fromCity" v-model="form.fromCity" placeholder="例如: 上海" required>
              </div>
              
              <div class="form-group">
                <label for="toCountry">目的国家</label>
                <select id="toCountry" v-model="form.toCountry">
                  <option v-for="country in countries" :value="country.code" :key="country.code">
                    {{ country.name }} ({{ country.code }})
                  </option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="toCity">目的城市</label>
                <input id="toCity" v-model="form.toCity" placeholder="例如: 纽约" required>
              </div>
              
              <div class="form-group">
                <label for="isRemoteArea">偏远地区？</label>
                <select id="isRemoteArea" v-model="form.isRemoteArea">
                  <option value="false">否</option>
                  <option value="true">是（+偏远附加费）</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="isResidential">住宅配送？</label>
                <select id="isResidential" v-model="form.isResidential">
                  <option value="false">否（商业地址）</option>
                  <option value="true">是（+住宅配送费）</option>
                </select>
              </div>
            </div>
          </div>

          <!-- 包裹详细信息 -->
          <div class="form-section-card">
            <h3 class="form-subtitle">📦 包裹信息</h3>
            <div class="form-grid triple">
              <div class="form-group">
                <label for="weight">实际重量 (kg)</label>
                <input id="weight" v-model.number="form.weight" type="number" min="0.1" step="0.1" required>
                <p class="helper-text">最小: 0.1kg</p>
              </div>
              
              <div class="form-group">
                <label for="length">长度 (cm)</label>
                <input id="length" v-model.number="form.length" type="number" min="1" required>
              </div>
              
              <div class="form-group">
                <label for="width">宽度 (cm)</label>
                <input id="width" v-model.number="form.width" type="number" min="1" required>
              </div>
              
              <div class="form-group">
                <label for="height">高度 (cm)</label>
                <input id="height" v-model.number="form.height" type="number" min="1" required>
              </div>
              
              <div class="form-group">
                <label for="volWeight">体积重量 (kg)</label>
                <input id="volWeight" v-model.number="form.volWeight" type="number" min="0.1" step="0.1" readonly>
                <p class="helper-text">自动计算</p>
              </div>
              
              <div class="form-group">
                <label for="chargeableWeight">计费重量 (kg)</label>
                <input id="chargeableWeight" v-model.number="form.chargeableWeight" type="number" readonly>
                <p class="helper-text">取实际与体积重量较大值</p>
              </div>
              
              <div class="form-group">
                <label for="value">申报价值 (USD)</label>
                <input id="value" v-model.number="form.value" type="number" min="0" step="10" required>
                <p class="helper-text">用于关税计算</p>
              </div>
              
              <div class="form-group">
                <label for="isOversized">超规格包裹？</label>
                <select id="isOversized" v-model="form.isOversized">
                  <option value="false">否</option>
                  <option value="true">是（单边>120cm或重量>30kg）</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="isPeakSeason">旺季时段？</label>
                <select id="isPeakSeason" v-model="form.isPeakSeason">
                  <option value="false">否</option>
                  <option value="true">是（节假日高峰期）</option>
                </select>
              </div>
            </div>
          </div>

          <!-- 服务选项 -->
          <div class="form-section-card">
            <h3 class="form-subtitle">🚚 服务选项</h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="serviceType">服务类型</label>
                <select id="serviceType" v-model="form.serviceType">
                  <option value="express">特快快递 (Express)</option>
                  <option value="standard">标准快递 (Standard)</option>
                  <option value="economy">经济快递 (Economy)</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="insurance">购买保险？</label>
                <select id="insurance" v-model="form.insurance">
                  <option value="false">否</option>
                  <option value="true">是（+保险费用）</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="dutyPrepaid">关税预付？</label>
                <select id="dutyPrepaid" v-model="form.dutyPrepaid">
                  <option value="false">否（收件人支付）</option>
                  <option value="true">是（+手续费）</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>选择快递公司</label>
                <div class="carrier-selection">
                  <label class="carrier-checkbox">
                    <input type="checkbox" v-model="form.selectedCarriers" value="UPS"> UPS
                  </label>
                  <label class="carrier-checkbox">
                    <input type="checkbox" v-model="form.selectedCarriers" value="DHL"> DHL
                  </label>
                  <label class="carrier-checkbox">
                    <input type="checkbox" v-model="form.selectedCarriers" value="FedEx"> FedEx
                  </label>
                  <label class="carrier-checkbox">
                    <input type="checkbox" v-model="form.selectedCarriers" value="EMS"> EMS
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="action-buttons">
            <button class="calculate-btn primary-btn" @click="calculateAllShipping" :disabled="loading || form.selectedCarriers.length === 0">
              <span class="btn-icon">🚀</span>
              <span class="btn-text">{{ loading ? '计算中...' : '计算运费' }}</span>
            </button>
            
            <button class="secondary-btn" @click="resetForm">
              <span class="btn-icon">🔄</span>
              <span class="btn-text">重置表单</span>
            </button>
          </div>
          
          <!-- 加载状态 -->
          <div class="loading-overlay" v-if="loading">
            <div class="loading-spinner"></div>
            <p>正在计算四大快递费用...</p>
          </div>
        </div>
      </section>

      <!-- 中间：四家快递对比结果 -->
      <section class="results-section" v-if="results.length > 0">
        <div class="section-header">
          <h2 class="section-title">2. 四大快递费用与时效对比</h2>
          <p class="section-desc">基于当前输入参数计算的详细费用分解</p>
        </div>
        
        <!-- 快递公司对比卡片 -->
        <div class="carrier-comparison">
          <div v-for="result in results" :key="result.carrier" class="carrier-card" :class="result.carrier.toLowerCase()">
            <div class="carrier-header">
              <div class="carrier-logo">{{ getCarrierLogo(result.carrier) }}</div>
              <div class="carrier-info">
                <h3 class="carrier-name">{{ result.carrier }}</h3>
                <p class="carrier-service">{{ result.serviceType }}</p>
              </div>
              <div class="carrier-badge" :class="{'cheapest': result.isCheapest, 'fastest': result.isFastest}">
                {{ result.isCheapest ? '最经济' : result.isFastest ? '最快速' : '' }}
              </div>
            </div>
            
            <div class="carrier-summary">
              <div class="summary-item">
                <span class="label">总费用</span>
                <span class="value total-cost">${{ result.totalCost.toFixed(2) }}</span>
              </div>
              <div class="summary-item">
                <span class="label">预估时效</span>
                <span class="value delivery-time">{{ result.deliveryDays }}个工作日</span>
              </div>
              <div class="summary-item">
                <span class="label">计费重量</span>
                <span class="value">{{ result.chargeableWeight.toFixed(2) }}kg</span>
              </div>
            </div>
            
            <div class="cost-breakdown">
              <h4>费用明细</h4>
              <div class="breakdown-item">
                <span>基础运费</span>
                <span>${{ result.baseFreight.toFixed(2) }}</span>
              </div>
              <div class="breakdown-item" v-if="result.fuelSurcharge > 0">
                <span>燃油附加费 {{ result.fuelRate }}%</span>
                <span>${{ result.fuelSurcharge.toFixed(2) }}</span>
              </div>
              <div class="breakdown-item" v-if="result.remoteSurcharge > 0">
                <span>偏远地区附加费</span>
                <span>${{ result.remoteSurcharge.toFixed(2) }}</span>
              </div>
              <div class="breakdown-item" v-if="result.residentialFee > 0">
                <span>住宅配送费</span>
                <span>${{ result.residentialFee.toFixed(2) }}</span>
              </div>
              <div class="breakdown-item" v-if="result.oversizeFee > 0">
                <span>超规格附加费</span>
                <span>${{ result.oversizeFee.toFixed(2) }}</span>
              </div>
              <div class="breakdown-item" v-if="result.peakSurcharge > 0">
                <span>旺季附加费</span>
                <span>${{ result.peakSurcharge.toFixed(2) }}</span>
              </div>
              <div class="breakdown-item" v-if="result.insuranceCost > 0">
                <span>保险费用</span>
                <span>${{ result.insuranceCost.toFixed(2) }}</span>
              </div>
              <div class="breakdown-item" v-if="result.dutyFee > 0">
                <span>关税预付手续费</span>
                <span>${{ result.dutyFee.toFixed(2) }}</span>
              </div>
              <div class="breakdown-item" v-if="result.estimatedDuty > 0">
                <span>预估关税 ({{ result.dutyRate }}%)</span>
                <span>${{ result.estimatedDuty.toFixed(2) }}</span>
              </div>
            </div>
            
            <div class="carrier-footer">
              <button class="details-btn" @click="showCarrierDetails(result)">查看详情</button>
              <button class="select-btn" @click="selectCarrier(result)">选择此快递</button>
            </div>
          </div>
        </div>

        <!-- 费用对比图表 -->
        <div class="comparison-chart" v-if="results.length > 1">
          <h3>费用与时效对比分析</h3>
          <div class="chart-container">
            <div class="chart-bars">
              <div v-for="result in results" :key="result.carrier" class="chart-bar-container">
                <div class="chart-label">{{ result.carrier }}</div>
                <div class="chart-bar-wrapper">
                  <div 
                    class="chart-bar cost-bar" 
                    :style="{ height: getBarHeight(result.totalCost, 'cost') + '%' }"
                    :title="'总费用: $' + result.totalCost.toFixed(2)"
                  >
                    <span class="bar-value">${{ result.totalCost.toFixed(0) }}</span>
                  </div>
                  <div 
                    class="chart-bar days-bar" 
                    :style="{ height: getBarHeight(result.deliveryDays, 'days') + '%' }"
                    :title="'时效: ' + result.deliveryDays + '天'"
                  >
                    <span class="bar-value">{{ result.deliveryDays }}天</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="chart-legend">
              <div class="legend-item"><span class="legend-color cost-legend"></span> 总费用 (USD)</div>
              <div class="legend-item"><span class="legend-color days-legend"></span> 时效 (工作日)</div>
            </div>
          </div>
        </div>

        <!-- 推荐建议 -->
        <div class="recommendation-section">
          <h3>💡 智能推荐</h3>
          <div class="recommendation-cards">
            <div class="recommendation-card" v-if="cheapestCarrier">
              <div class="rec-icon">💰</div>
              <div class="rec-content">
                <h4>最经济选择</h4>
                <p><strong>{{ cheapestCarrier.carrier }}</strong> - ${{ cheapestCarrier.totalCost.toFixed(2) }}</p>
                <p>适合对时效要求不高的常规货物</p>
              </div>
            </div>
            <div class="recommendation-card" v-if="fastestCarrier">
              <div class="rec-icon">⚡</div>
              <div class="rec-content">
                <h4>最快速选择</h4>
                <p><strong>{{ fastestCarrier.carrier }}</strong> - {{ fastestCarrier.deliveryDays }}个工作日</p>
                <p>适合紧急文件和高价值时效货物</p>
              </div>
            </div>
            <div class="recommendation-card" v-if="bestValueCarrier">
              <div class="rec-icon">⭐</div>
              <div class="rec-content">
                <h4>最佳性价比</h4>
                <p><strong>{{ bestValueCarrier.carrier }}</strong> - ${{ bestValueCarrier.totalCost.toFixed(2) }} / {{ bestValueCarrier.deliveryDays }}天</p>
                <p>平衡了费用和时效的最佳选择</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 结果说明 -->
        <div class="results-info">
          <div class="info-icon">ℹ️</div>
          <div class="info-content">
            <h4>计算结果说明</h4>
            <p>以上费用为估算值，实际费用可能因燃油费率变化、汇率波动、实际重量与体积重量的最终确认等因素有所不同。时效为工作日估算，不包含清关延误、天气因素或节假日影响。</p>
          </div>
        </div>
      </section>

      <!-- 右侧：信息与说明区域 -->
      <aside class="info-section">
        <div class="info-content">
          <div class="info-card">
            <h3 class="info-title">📋 计算说明</h3>
            <p class="info-text">本计算器基于以下标准计算费用：</p>
            <ul class="info-list">
              <li><strong>计费重量</strong>：取实际重量和体积重量中的较大值</li>
              <li><strong>体积重量</strong>：长×宽×高(cm) ÷ 5000</li>
              <li><strong>基础运费</strong>：基于各快递公司最新费率表</li>
              <li><strong>燃油附加费</strong>：基于月度调整的燃油费率</li>
              <li><strong>关税</strong>：基于货物价值和目的国税率估算</li>
            </ul>
          </div>
          
          <div class="info-card">
            <h3 class="info-title">🏢 快递公司特点</h3>
            <ul class="info-list">
              <li><strong>UPS</strong>：北美线路优势明显，清关能力强，附加费透明</li>
              <li><strong>DHL</strong>：欧洲线路时效快，文件类服务专业，网络覆盖广</li>
              <li><strong>FedEx</strong>：美国国内优势明显，一体化供应链解决方案</li>
              <li><strong>EMS</strong>：清关便利，性价比高，适合电商小包</li>
            </ul>
          </div>
          
          <div class="info-card">
            <h3 class="info-title">ℹ️ 重要提示</h3>
            <ul class="info-list">
              <li>计算结果为估算值，最终费用以快递公司账单为准</li>
              <li>关税金额为预估值，实际以海关核定为准</li>
              <li>时效为工作日估算，不包含清关延误</li>
              <li>偏远地区判定标准因快递公司而异</li>
              <li>旺季附加费通常在10月-次年1月征收</li>
            </ul>
          </div>
          
          <div class="info-card">
            <h3 class="info-title">📈 当前费率参考</h3>
            <div class="rate-info">
              <div class="rate-item">
                <span>燃油附加费率</span>
                <span class="rate-value">{{ currentFuelSurcharge }}%</span>
              </div>
              <div class="rate-item">
                <span>数据更新时间</span>
                <span class="rate-value">{{ currentMonth }}</span>
              </div>
              <div class="rate-item">
                <span>支持国家</span>
                <span class="rate-value">{{ countries.length }}个</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </main>

    <!-- 底部广告横幅 -->
    <div class="ad-banner bottom-banner">
      <div class="ad-placeholder">
        <h3>合作伙伴广告位</h3>
        <p>此区域可放置相关物流、电商或支付服务的广告</p>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="main-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4 class="footer-title">国际运费计算器</h4>
          <p class="footer-text">专业比较四大国际快递的费用与时效，助您做出最佳物流决策</p>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">快速链接</h4>
          <ul class="footer-links">
            <li><a href="#" @click.prevent="scrollToTop">回到顶部</a></li>
            <li><a href="#" @click.prevent="resetForm">重新计算</a></li>
            <li><a href="#" @click.prevent="showHelp">使用帮助</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">数据声明</h4>
          <p class="footer-text">费率数据每月更新，计算结果仅供参考</p>
          <p class="footer-text">实际费用以各快递公司官方报价为准</p>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">支持与反馈</h4>
          <p class="footer-text">如有问题或建议，请联系我们</p>
          <p class="footer-email">contact@shipping-calculator.com</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">© 2023 国际运费计算器 | 计算结果仅供参考，实际费用以各快递公司官方报价为准</p>
        <p class="version">版本: 2.0.0 | 最后更新: 2023年12月</p>
      </div>
    </footer>
  </div>
</template>

<template>
  <Analytics />
  <!-- your content -->
</template>

<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue';
</script>

<script setup>
import { ref, computed, reactive, watch } from 'vue'


// 国家/地区列表
const countries = [
  { code: 'US', name: '美国' },
  { code: 'CN', name: '中国' },
  { code: 'DE', name: '德国' },
  { code: 'GB', name: '英国' },
  { code: 'JP', name: '日本' },
  { code: 'CA', name: '加拿大' },
  { code: 'AU', name: '澳大利亚' },
  { code: 'FR', name: '法国' },
  { code: 'IT', name: '意大利' },
  { code: 'ES', name: '西班牙' },
  { code: 'KR', name: '韩国' },
  { code: 'SG', name: '新加坡' },
  { code: 'HK', name: '香港' },
  { code: 'TW', name: '台湾' },
  { code: 'MY', name: '马来西亚' },
  { code: 'TH', name: '泰国' },
  { code: 'VN', name: '越南' }
]

// 表单数据
const form = reactive({
  fromCountry: 'CN',
  fromCity: '上海',
  toCountry: 'US',
  toCity: '纽约',
  isRemoteArea: false,
  isResidential: false,
  weight: 2.5,
  length: 30,
  width: 20,
  height: 15,
  volWeight: 0,
  chargeableWeight: 2.5,
  value: 100,
  isOversized: false,
  isPeakSeason: false,
  serviceType: 'express',
  insurance: false,
  dutyPrepaid: false,
  selectedCarriers: ['UPS', 'DHL', 'FedEx', 'EMS']
})

// 状态管理
const loading = ref(false)
const results = ref([])
const currentMonth = ref('2026年1月')
const currentFuelSurcharge = ref(28.5) // 当前燃油附加费率

// 监听尺寸变化计算体积重量
watch([() => form.length, () => form.width, () => form.height], () => {
  if (form.length > 0 && form.width > 0 && form.height > 0) {
    form.volWeight = parseFloat(((form.length * form.width * form.height) / 5000).toFixed(2))
    form.chargeableWeight = Math.max(form.weight, form.volWeight)
  }
})

// 监听重量变化更新计费重量
watch(() => form.weight, (newWeight) => {
  form.chargeableWeight = Math.max(newWeight, form.volWeight)
})

// 计算属性
const cheapestCarrier = computed(() => {
  if (results.value.length === 0) return null
  return results.value.reduce((min, curr) => 
    curr.totalCost < min.totalCost ? curr : min
  )
})

const fastestCarrier = computed(() => {
  if (results.value.length === 0) return null
  return results.value.reduce((min, curr) => 
    curr.deliveryDays < min.deliveryDays ? curr : min
  )
})

const bestValueCarrier = computed(() => {
  if (results.value.length === 0) return null
  // 计算性价比分数：费用权重60%，时效权重40%
  const normalizedResults = results.value.map(result => {
    const maxCost = Math.max(...results.value.map(r => r.totalCost))
    const maxDays = Math.max(...results.value.map(r => r.deliveryDays))
    const costScore = (1 - result.totalCost / maxCost) * 0.6
    const timeScore = (1 - result.deliveryDays / maxDays) * 0.4
    return { ...result, valueScore: costScore + timeScore }
  })
  return normalizedResults.reduce((best, curr) => 
    curr.valueScore > best.valueScore ? curr : best
  )
})

// 主要计算方法
const calculateAllShipping = async () => {
  if (form.selectedCarriers.length === 0) {
    alert('请至少选择一家快递公司')
    return
  }
  
  loading.value = true
  results.value = []
  
  // 模拟API调用延迟
  await new Promise(resolve => setTimeout(resolve, 800))
  
  try {
    // 计算计费重量
    const chargeableWeight = Math.max(form.weight, form.volWeight)
    
    // 为每家选中的快递公司计算费用
    const allResults = []
    
    if (form.selectedCarriers.includes('UPS')) {
      allResults.push(calculateUPS(chargeableWeight))
    }
    
    if (form.selectedCarriers.includes('DHL')) {
      allResults.push(calculateDHL(chargeableWeight))
    }
    
    if (form.selectedCarriers.includes('FedEx')) {
      allResults.push(calculateFedEx(chargeableWeight))
    }
    
    if (form.selectedCarriers.includes('EMS')) {
      allResults.push(calculateEMS(chargeableWeight))
    }
    
    // 标记最便宜和最快速的选项
    if (allResults.length > 0) {
      const minCost = Math.min(...allResults.map(r => r.totalCost))
      const minDays = Math.min(...allResults.map(r => r.deliveryDays))
      
      allResults.forEach(result => {
        result.isCheapest = Math.abs(result.totalCost - minCost) < 0.01
        result.isFastest = result.deliveryDays === minDays
      })
      
      results.value = allResults
    }
    
  } catch (error) {
    console.error('计算错误:', error)
    alert('计算过程中出现错误，请检查输入数据')
  } finally {
    loading.value = false
  }
}

// UPS 费用计算
const calculateUPS = (chargeableWeight) => {
  const baseRates = {
    express: { firstKg: 45, additionalKg: 15 },
    standard: { firstKg: 32, additionalKg: 12 },
    economy: { firstKg: 28, additionalKg: 10 }
  }
  
  const rate = baseRates[form.serviceType]
  let baseFreight = rate.firstKg
  
  if (chargeableWeight > 1) {
    baseFreight += Math.ceil(chargeableWeight - 1) * rate.additionalKg
  }
  
  // 燃油附加费
  const fuelSurcharge = baseFreight * (currentFuelSurcharge.value / 100)
  
  // 偏远地区附加费
  const remoteSurcharge = form.isRemoteArea ? baseFreight * 0.15 : 0
  
  // 住宅配送费
  const residentialFee = form.isResidential ? 15 : 0
  
  // 超规格附加费
  const oversizeFee = form.isOversized ? 40 : 0
  
  // 旺季附加费
  const peakSurcharge = form.isPeakSeason ? baseFreight * 0.10 : 0
  
  // 保险费用
  const insuranceCost = form.insurance ? Math.max(form.value * 0.01, 5) : 0
  
  // 关税预付手续费
  const dutyFee = form.dutyPrepaid ? 15 : 0
  
  // 预估关税
  const dutyRate = getDutyRate(form.toCountry)
  const estimatedDuty = form.value * (dutyRate / 100)
  
  // 总费用
  const totalCost = baseFreight + fuelSurcharge + remoteSurcharge + 
                   residentialFee + oversizeFee + peakSurcharge + 
                   insuranceCost + dutyFee + estimatedDuty
  
  // 预估时效
  const deliveryDays = estimateDeliveryTime('UPS', form.serviceType, form.toCountry)
  
  return {
    carrier: 'UPS',
    serviceType: getServiceName(form.serviceType),
    chargeableWeight,
    baseFreight,
    fuelSurcharge,
    fuelRate: currentFuelSurcharge.value,
    remoteSurcharge,
    residentialFee,
    oversizeFee,
    peakSurcharge,
    insuranceCost,
    dutyFee,
    estimatedDuty,
    dutyRate,
    totalCost,
    deliveryDays,
    isCheapest: false,
    isFastest: false
  }
}

// DHL 费用计算
const calculateDHL = (chargeableWeight) => {
  const baseRates = {
    express: { firstKg: 48, additionalKg: 16 },
    standard: { firstKg: 35, additionalKg: 13 },
    economy: { firstKg: 30, additionalKg: 11 }
  }
  
  const rate = baseRates[form.serviceType]
  let baseFreight = rate.firstKg
  
  if (chargeableWeight > 1) {
    baseFreight += Math.ceil(chargeableWeight - 1) * rate.additionalKg
  }
  
  const fuelSurcharge = baseFreight * (currentFuelSurcharge.value / 100)
  const remoteSurcharge = form.isRemoteArea ? baseFreight * 0.12 : 0
  const residentialFee = form.isResidential ? 12 : 0
  const oversizeFee = form.isOversized ? 35 : 0
  const peakSurcharge = form.isPeakSeason ? baseFreight * 0.08 : 0
  const insuranceCost = form.insurance ? Math.max(form.value * 0.01, 5) : 0
  const dutyFee = form.dutyPrepaid ? 12 : 0
  
  const dutyRate = getDutyRate(form.toCountry)
  const estimatedDuty = form.value * (dutyRate / 100)
  
  const totalCost = baseFreight + fuelSurcharge + remoteSurcharge + 
                   residentialFee + oversizeFee + peakSurcharge + 
                   insuranceCost + dutyFee + estimatedDuty
  
  const deliveryDays = estimateDeliveryTime('DHL', form.serviceType, form.toCountry)
  
  return {
    carrier: 'DHL',
    serviceType: getServiceName(form.serviceType),
    chargeableWeight,
    baseFreight,
    fuelSurcharge,
    fuelRate: currentFuelSurcharge.value,
    remoteSurcharge,
    residentialFee,
    oversizeFee,
    peakSurcharge,
    insuranceCost,
    dutyFee,
    estimatedDuty,
    dutyRate,
    totalCost,
    deliveryDays,
    isCheapest: false,
    isFastest: false
  }
}

// FedEx 费用计算
const calculateFedEx = (chargeableWeight) => {
  const baseRates = {
    express: { firstKg: 46, additionalKg: 15.5 },
    standard: { firstKg: 33, additionalKg: 12.5 },
    economy: { firstKg: 29, additionalKg: 10.5 }
  }
  
  const rate = baseRates[form.serviceType]
  let baseFreight = rate.firstKg
  
  if (chargeableWeight > 1) {
    baseFreight += Math.ceil(chargeableWeight - 1) * rate.additionalKg
  }
  
  const fuelSurcharge = baseFreight * (currentFuelSurcharge.value / 100)
  const remoteSurcharge = form.isRemoteArea ? baseFreight * 0.14 : 0
  const residentialFee = form.isResidential ? 14 : 0
  const oversizeFee = form.isOversized ? 38 : 0
  const peakSurcharge = form.isPeakSeason ? baseFreight * 0.09 : 0
  const insuranceCost = form.insurance ? Math.max(form.value * 0.01, 5) : 0
  const dutyFee = form.dutyPrepaid ? 14 : 0
  
  const dutyRate = getDutyRate(form.toCountry)
  const estimatedDuty = form.value * (dutyRate / 100)
  
  const totalCost = baseFreight + fuelSurcharge + remoteSurcharge + 
                   residentialFee + oversizeFee + peakSurcharge + 
                   insuranceCost + dutyFee + estimatedDuty
  
  const deliveryDays = estimateDeliveryTime('FedEx', form.serviceType, form.toCountry)
  
  return {
    carrier: 'FedEx',
    serviceType: getServiceName(form.serviceType),
    chargeableWeight,
    baseFreight,
    fuelSurcharge,
    fuelRate: currentFuelSurcharge.value,
    remoteSurcharge,
    residentialFee,
    oversizeFee,
    peakSurcharge,
    insuranceCost,
    dutyFee,
    estimatedDuty,
    dutyRate,
    totalCost,
    deliveryDays,
    isCheapest: false,
    isFastest: false
  }
}

// EMS 费用计算
const calculateEMS = (chargeableWeight) => {
  const baseRates = {
    express: { firstKg: 38, additionalKg: 12 },
    standard: { firstKg: 28, additionalKg: 10 },
    economy: { firstKg: 22, additionalKg: 8 }
  }
  
  const rate = baseRates[form.serviceType]
  let baseFreight = rate.firstKg
  
  if (chargeableWeight > 1) {
    baseFreight += Math.ceil(chargeableWeight - 1) * rate.additionalKg
  }
  
  const fuelSurcharge = baseFreight * 0.05
  const remoteSurcharge = form.isRemoteArea ? baseFreight * 0.10 : 0
  const residentialFee = form.isResidential ? 8 : 0
  const oversizeFee = form.isOversized ? 25 : 0
  const peakSurcharge = form.isPeakSeason ? baseFreight * 0.05 : 0
  const insuranceCost = form.insurance ? Math.max(form.value * 0.008, 4) : 0
  const dutyFee = form.dutyPrepaid ? 10 : 0
  
  const dutyRate = getDutyRate(form.toCountry)
  const estimatedDuty = form.value * (dutyRate / 100)
  
  const totalCost = baseFreight + fuelSurcharge + remoteSurcharge + 
                   residentialFee + oversizeFee + peakSurcharge + 
                   insuranceCost + dutyFee + estimatedDuty
  
  const deliveryDays = estimateDeliveryTime('EMS', form.serviceType, form.toCountry)
  
  return {
    carrier: 'EMS',
    serviceType: getServiceName(form.serviceType),
    chargeableWeight,
    baseFreight,
    fuelSurcharge,
    fuelRate: 5,
    remoteSurcharge,
    residentialFee,
    oversizeFee,
    peakSurcharge,
    insuranceCost,
    dutyFee,
    estimatedDuty,
    dutyRate,
    totalCost,
    deliveryDays,
    isCheapest: false,
    isFastest: false
  }
}

// 辅助函数：获取关税税率
const getDutyRate = (countryCode) => {
  const dutyRates = {
    'US': 10,
    'CA': 12,
    'GB': 15,
    'DE': 16,
    'FR': 15,
    'IT': 15,
    'ES': 15,
    'AU': 10,
    'JP': 8,
    'KR': 10,
    'CN': 13,
    'HK': 0,
    'SG': 7,
    'MY': 10,
    'TH': 15,
    'VN': 15
  }
  return dutyRates[countryCode] || 10
}

// 辅助函数：预估运输时间
const estimateDeliveryTime = (carrier, serviceType, toCountry) => {
  const baseDays = {
    'UPS': { express: 3, standard: 6, economy: 10 },
    'DHL': { express: 2, standard: 5, economy: 8 },
    'FedEx': { express: 3, standard: 6, economy: 9 },
    'EMS': { express: 7, standard: 10, economy: 14 }
  }
  
  let days = baseDays[carrier][serviceType]
  
  // 根据目的地调整
  const regionAdjustments = {
    'US': 0,
    'CA': 1,
    'GB': 1,
    'DE': 1,
    'FR': 1,
    'IT': 1,
    'ES': 1,
    'AU': 2,
    'JP': 0,
    'KR': 0,
    'SG': 0,
    'MY': 1,
    'TH': 1,
    'VN': 1
  }
  
  days += regionAdjustments[toCountry] || 1
  
  return Math.max(days, 2)
}

// 辅助函数：获取服务名称
const getServiceName = (serviceCode) => {
  const services = {
    'express': '特快快递',
    'standard': '标准快递',
    'economy': '经济快递'
  }
  return services[serviceCode] || '标准快递'
}

// 辅助函数：获取快递公司logo
const getCarrierLogo = (carrier) => {
  const logos = {
    'UPS': '📦',
    'DHL': '🚚',
    'FedEx': '✈️',
    'EMS': '📮'
  }
  return logos[carrier] || '📦'
}

// 图表辅助函数
const getBarHeight = (value, type) => {
  if (results.value.length === 0) return 0
  
  if (type === 'cost') {
    const maxCost = Math.max(...results.value.map(r => r.totalCost))
    return maxCost > 0 ? (value / maxCost) * 80 + 20 : 20
  } else {
    const maxDays = Math.max(...results.value.map(r => r.deliveryDays))
    return maxDays > 0 ? (value / maxDays) * 80 + 20 : 20
  }
}

// UI交互函数
const showCarrierDetails = (carrier) => {
  const details = `
快递公司: ${carrier.carrier}
服务类型: ${carrier.serviceType}
计费重量: ${carrier.chargeableWeight.toFixed(2)}kg
基础运费: $${carrier.baseFreight.toFixed(2)}
燃油附加费: $${carrier.fuelSurcharge.toFixed(2)} (${carrier.fuelRate}%)
偏远附加费: $${carrier.remoteSurcharge.toFixed(2)}
住宅配送费: $${carrier.residentialFee.toFixed(2)}
超规格费: $${carrier.oversizeFee.toFixed(2)}
旺季附加费: $${carrier.peakSurcharge.toFixed(2)}
保险费用: $${carrier.insuranceCost.toFixed(2)}
关税预付: $${carrier.dutyFee.toFixed(2)}
预估关税: $${carrier.estimatedDuty.toFixed(2)} (${carrier.dutyRate}%)
───────────────
总计: $${carrier.totalCost.toFixed(2)}
预估时效: ${carrier.deliveryDays}个工作日
  `
  alert(details)
}

const selectCarrier = (carrier) => {
  alert(`已选择 ${carrier.carrier} ${carrier.serviceType}\n总费用: $${carrier.totalCost.toFixed(2)}\n预估时效: ${carrier.deliveryDays}个工作日\n\n您将被引导至官方网站完成寄件。`)
}

const resetForm = () => {
  form.fromCountry = 'CN'
  form.fromCity = '上海'
  form.toCountry = 'US'
  form.toCity = '纽约'
  form.isRemoteArea = false
  form.isResidential = false
  form.weight = 2.5
  form.length = 30
  form.width = 20
  form.height = 15
  form.volWeight = parseFloat(((30*20*15)/5000).toFixed(2))
  form.chargeableWeight = 2.5
  form.value = 100
  form.isOversized = false
  form.isPeakSeason = false
  form.serviceType = 'express'
  form.insurance = false
  form.dutyPrepaid = false
  form.selectedCarriers = ['UPS', 'DHL', 'FedEx', 'EMS']
  results.value = []
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const showHelp = () => {
  alert('使用帮助：\n1. 填写发货地和目的地信息\n2. 输入包裹详细信息和价值\n3. 选择需要的服务选项\n4. 勾选要比较的快递公司\n5. 点击"计算运费"获取报价')
}
</script>

<style scoped>
/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
}

/* 主容器 - 宽度扩展至2倍 */
.container {
  max-width: 2400px;
  margin: 0 auto;
  padding: 30px 40px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 广告横幅样式 */
.ad-banner {
  margin: 25px 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.top-banner {
  margin-top: 0;
  margin-bottom: 40px;
}

.bottom-banner {
  margin-top: 50px;
  margin-bottom: 0;
}

.ad-placeholder {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 40px;
  text-align: center;
  border-radius: 16px;
}

.ad-placeholder h3 {
  font-size: 28px;
  margin-bottom: 15px;
  font-weight: 700;
}

.ad-placeholder p {
  font-size: 18px;
  opacity: 0.9;
}

/* 主标题区域 */
.main-header {
  background: white;
  border-radius: 20px;
  padding: 50px;
  margin-bottom: 50px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
}

.logo-area {
  flex: 1;
  min-width: 600px;
}

.main-title {
  font-size: 44px;
  color: #1e293b;
  margin-bottom: 20px;
  font-weight: 800;
  line-height: 1.2;
}

.main-subtitle {
  font-size: 22px;
  color: #64748b;
  max-width: 900px;
  line-height: 1.5;
}

.header-info {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
  background: #f8fafc;
  border-radius: 16px;
  min-width: 220px;
  border: 1px solid #e2e8f0;
}

.info-icon {
  font-size: 36px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.info-text h4 {
  font-size: 20px;
  color: #1e293b;
  margin-bottom: 5px;
  font-weight: 700;
}

.info-text p {
  font-size: 16px;
  color: #64748b;
}

/* 主要内容区域 - 三列布局 */
.main-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr 0.8fr;
  gap: 40px;
  margin-bottom: 60px;
  flex: 1;
}

/* 各区域公共样式 */
.input-section,
.results-section,
.info-section {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
}

.section-header {
  margin-bottom: 40px;
}

.section-title {
  font-size: 32px;
  color: #1e293b;
  margin-bottom: 15px;
  font-weight: 700;
}

.section-desc {
  font-size: 18px;
  color: #64748b;
}

/* 表单区域样式 */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 35px;
  position: relative;
}

.form-section-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 35px;
  border: 1px solid #e2e8f0;
}

.form-subtitle {
  font-size: 24px;
  color: #1e293b;
  margin-bottom: 25px;
  font-weight: 600;
  padding-bottom: 15px;
  border-bottom: 2px solid #e2e8f0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.form-grid.triple {
  grid-template-columns: repeat(3, 1fr);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 18px;
  color: #475569;
  margin-bottom: 12px;
  font-weight: 600;
}

.form-group input,
.form-group select {
  padding: 18px 20px;
  font-size: 18px;
  border: 2px solid #cbd5e1;
  border-radius: 12px;
  background: white;
  transition: all 0.3s ease;
  color: #1e293b;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-group input::placeholder {
  color: #94a3b8;
}

.form-group input[readonly] {
  background-color: #f1f5f9;
  cursor: not-allowed;
}

.helper-text {
  font-size: 14px;
  color: #64748b;
  margin-top: 8px;
}

/* 快递公司选择器 */
.carrier-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
}

.carrier-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: #f8fafc;
  border-radius: 10px;
  border: 2px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.carrier-checkbox:hover {
  background: #f1f5f9;
}

.carrier-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* 按钮样式 */
.action-buttons {
  display: flex;
  gap: 25px;
  margin-top: 20px;
}

.calculate-btn,
.primary-btn,
.secondary-btn {
  padding: 22px 40px;
  font-size: 20px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-weight: 600;
}

.primary-btn {
  flex: 2;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
}

.primary-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.secondary-btn {
  flex: 1;
  background: #f1f5f9;
  color: #475569;
  border: 2px solid #cbd5e1;
}

.secondary-btn:hover {
  background: #e2e8f0;
}

.btn-icon {
  font-size: 24px;
}

.btn-text {
  font-size: 20px;
}

/* 加载状态 */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  z-index: 10;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4f46e5;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 快递公司卡片样式 */
.carrier-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  margin: 30px 0;
}

.carrier-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.carrier-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

.carrier-card.ups {
  border-top: 4px solid #351c15;
}

.carrier-card.dhl {
  border-top: 4px solid #ffcc00;
}

.carrier-card.fedex {
  border-top: 4px solid #4d148c;
}

.carrier-card.ems {
  border-top: 4px solid #da291c;
}

.carrier-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f1f5f9;
}

.carrier-logo {
  font-size: 36px;
  margin-right: 15px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 12px;
}

.carrier-info {
  flex: 1;
}

.carrier-name {
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 5px;
}

.carrier-service {
  font-size: 15px;
  color: #64748b;
}

.carrier-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.carrier-badge.cheapest {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
}

.carrier-badge.fastest {
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  color: white;
}

.carrier-summary {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.summary-item:last-child {
  margin-bottom: 0;
}

.summary-item .label {
  font-size: 15px;
  color: #64748b;
}

.summary-item .value {
  font-size: 17px;
  font-weight: 600;
  color: #1e293b;
}

.summary-item .total-cost {
  font-size: 24px;
  color: #10b981;
  font-weight: 700;
}

.summary-item .delivery-time {
  color: #3b82f6;
}

.cost-breakdown {
  margin-bottom: 20px;
}

.cost-breakdown h4 {
  font-size: 16px;
  color: #475569;
  margin-bottom: 15px;
  font-weight: 600;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
}

.breakdown-item:last-child {
  border-bottom: none;
}

.breakdown-item span:first-child {
  color: #64748b;
}

.breakdown-item span:last-child {
  color: #1e293b;
  font-weight: 500;
}

.carrier-footer {
  display: flex;
  gap: 10px;
}

.carrier-footer button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.carrier-footer .details-btn {
  background: #f1f5f9;
  color: #475569;
}

.carrier-footer .details-btn:hover {
  background: #e2e8f0;
}

.carrier-footer .select-btn {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
}

.carrier-footer .select-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

/* 图表样式 */
.comparison-chart {
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin: 40px 0;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.06);
}

.comparison-chart h3 {
  font-size: 22px;
  color: #1e293b;
  margin-bottom: 25px;
  font-weight: 700;
}

.chart-container {
  margin-top: 20px;
}

.chart-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 300px;
  padding: 0 40px;
  border-bottom: 2px solid #e2e8f0;
  position: relative;
}

.chart-bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
}

.chart-label {
  font-size: 16px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 15px;
}

.chart-bar-wrapper {
  display: flex;
  gap: 10px;
  width: 100%;
  height: 200px;
  align-items: flex-end;
}

.chart-bar {
  width: 40px;
  border-radius: 8px 8px 0 0;
  position: relative;
  transition: height 0.5s ease;
}

.cost-bar {
  background: linear-gradient(to top, #10b981, #34d399);
}

.days-bar {
  background: linear-gradient(to top, #3b82f6, #60a5fa);
}

.bar-value {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  white-space: nowrap;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 25px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  color: #475569;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.cost-legend {
  background: linear-gradient(135deg, #10b981, #34d399);
}

.days-legend {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

/* 推荐卡片样式 */
.recommendation-section {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 16px;
  padding: 30px;
  margin: 30px 0;
  border: 2px solid #bae6fd;
}

.recommendation-section h3 {
  font-size: 24px;
  color: #0369a1;
  margin-bottom: 25px;
  font-weight: 700;
}

.recommendation-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.recommendation-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.rec-icon {
  font-size: 40px;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 12px;
}

.rec-content h4 {
  font-size: 18px;
  color: #1e293b;
  margin-bottom: 8px;
  font-weight: 700;
}

.rec-content p {
  font-size: 15px;
  color: #64748b;
  margin-bottom: 5px;
}

/* 结果说明 */
.results-info {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
  margin-top: 30px;
  border-left: 4px solid #4f46e5;
}

.results-info .info-icon {
  font-size: 28px;
  width: 50px;
  height: 50px;
  background: #e0e7ff;
  color: #4f46e5;
}

.results-info .info-content h4 {
  font-size: 18px;
  color: #1e293b;
  margin-bottom: 10px;
  font-weight: 600;
}

.results-info .info-content p {
  font-size: 16px;
  color: #64748b;
  line-height: 1.5;
}

/* 右侧信息区域样式 */
.info-section {
  height: fit-content;
  position: sticky;
  top: 40px;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 35px;
}

.info-section .info-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 30px;
  border: 1px solid #e2e8f0;
  display: block;
}

.info-section .info-title {
  font-size: 24px;
  color: #1e293b;
  margin-bottom: 20px;
  font-weight: 700;
  padding-bottom: 15px;
  border-bottom: 2px solid #e2e8f0;
}

.info-section .info-list {
  list-style-type: none;
}

.info-section .info-list li {
  font-size: 17px;
  color: #475569;
  margin-bottom: 15px;
  padding-left: 10px;
  position: relative;
  line-height: 1.5;
}

.info-section .info-list li:before {
  content: "›";
  color: #4f46e5;
  font-size: 20px;
  position: absolute;
  left: -15px;
}

.info-section .info-text {
  font-size: 17px;
  color: #475569;
  margin-bottom: 15px;
  line-height: 1.5;
}

.rate-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.rate-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

.rate-item:last-child {
  border-bottom: none;
}

.rate-item span:first-child {
  color: #64748b;
  font-size: 16px;
}

.rate-item .rate-value {
  color: #1e293b;
  font-weight: 600;
  font-size: 18px;
}

/* 页脚样式 */
.main-footer {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  border-radius: 20px;
  padding: 60px 50px 30px;
  margin-top: 60px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  margin-bottom: 50px;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-title {
  font-size: 22px;
  color: #f1f5f9;
  margin-bottom: 25px;
  font-weight: 700;
  position: relative;
  padding-bottom: 15px;
}

.footer-title:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 3px;
  background: #4f46e5;
  border-radius: 2px;
}

.footer-text {
  font-size: 17px;
  color: #cbd5e1;
  line-height: 1.6;
  margin-bottom: 20px;
}

.footer-links {
  list-style-type: none;
}

.footer-links li {
  margin-bottom: 15px;
}

.footer-links a {
  font-size: 17px;
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
}

.footer-links a:hover {
  color: #4f46e5;
}

.footer-email {
  font-size: 16px;
  color: #94a3b8;
  margin-top: 10px;
}

.footer-bottom {
  border-top: 1px solid #334155;
  padding-top: 30px;
  text-align: center;
}

.copyright {
  font-size: 16px;
  color: #94a3b8;
  line-height: 1.5;
  margin-bottom: 10px;
}

.version {
  font-size: 14px;
  color: #64748b;
}

/* 响应式设计 */
@media (max-width: 2000px) {
  .container {
    max-width: 1800px;
    padding: 30px;
  }
  
  .main-content {
    grid-template-columns: 1fr 1fr;
  }
  
  .info-section {
    grid-column: span 2;
    margin-top: 40px;
    position: static;
  }
}

@media (max-width: 1400px) {
  .carrier-comparison {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1200px) {
  .container {
    max-width: 100%;
    padding: 20px;
  }
  
  .main-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .info-section {
    grid-column: span 1;
    margin-top: 0;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .summary-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1100px) {
  .carrier-comparison {
    grid-template-columns: 1fr;
  }
  
  .chart-bars {
    padding: 0 20px;
  }
  
  .chart-bar-container {
    width: 80px;
  }
}

@media (max-width: 768px) {
  .main-header {
    padding: 30px;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .logo-area {
    min-width: 100%;
  }
  
  .header-info {
    justify-content: center;
  }
  
  .info-card {
    min-width: 200px;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-grid.triple {
    grid-template-columns: 1fr;
  }
  
  .carrier-comparison {
    grid-template-columns: 1fr;
  }
  
  .chart-bars {
    flex-direction: column;
    height: auto;
    align-items: center;
    gap: 30px;
  }
  
  .chart-bar-wrapper {
    flex-direction: row;
    height: 150px;
    width: 100%;
    justify-content: center;
  }
  
  .recommendation-cards {
    grid-template-columns: 1fr;
  }
  
  .carrier-footer {
    flex-direction: column;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.results-section {
  animation: fadeIn 0.5s ease-out;
}

/* 打印样式 */
@media print {
  .ad-banner,
  .action-buttons,
  .details-btn,
  .select-btn,
  .footer-links a {
    display: none !important;
  }
  
  .container {
    max-width: 100%;
    padding: 0;
  }
  
  .main-content {
    display: block;
  }
  
  .input-section,
  .results-section,
  .info-section {
    box-shadow: none;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    page-break-inside: avoid;
  }
}
</style>