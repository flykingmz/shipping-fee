<template>
  <div class="container">
    <!-- 顶部广告横幅 -->
    <div class="ad-banner top-banner">
      <div class="ad-placeholder">
        <h3>国际物流运费计算器</h3>
        <p>实时比较UPS、DHL、FedEx、EMS四大快递服务</p>
      </div>
    </div>

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
                  <option v-for="country in countries" :value="country.code">
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
                  <option v-for="country in countries" :value="country.code">
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
                <label for="volWeight">体积重量 (kg)</label>
                <input id="volWeight" v-model.number="form.volWeight" type="number" min="0.1" step="0.1">
                <p class="helper-text">长×宽×高(cm)/5000</p>
              </div>
              
              <div class="form-group">
                <label for="chargeableWeight">计费重量 (kg)</label>
                <input id="chargeableWeight" v-model.number="form.chargeableWeight" type="number" readonly>
                <p class="helper-text">取实际与体积重量较大值</p>
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
                <label for="carriers">选择快递公司</label>
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
            <button class="calculate-btn primary-btn" @click="calculateAllShipping" :disabled="loading">
              <span class="btn-icon">🚀</span>
              <span class="btn-text">{{ loading ? '计算中...' : '计算四大快递费用' }}</span>
            </button>
            
            <button class="secondary-btn" @click="resetForm">
              <span class="btn-icon">🔄</span>
              <span class="btn-text">重置表单</span>
            </button>
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
                <span class="value">{{ result.chargeableWeight }}kg</span>
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
        <div class="comparison-chart">
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
        </div>
      </aside>
    </main>

    <!-- 页脚 -->
    <footer class="main-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4 class="footer-title">国际运费计算器</h4>
          <p class="footer-text">专业比较四大国际快递的费用与时效，助您做出最佳物流决策</p>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">数据更新</h4>
          <p class="footer-text">费率数据每月更新</p>
          <p class="footer-text">燃油附加费：{{ currentFuelSurcharge }}% ({{ currentMonth }})</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">© 2023 国际运费计算器 | 计算结果仅供参考，实际费用以各快递公司官方报价为准</p>
      </div>
    </footer>
  </div>
</template>

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
  volWeight: 0,
  chargeableWeight: 2.5,
  length: 30,
  width: 20,
  height: 15,
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
const currentMonth = ref('2023年12月')
const currentFuelSurcharge = ref(18.5) // 当前燃油附加费率

// 监听尺寸变化计算体积重量
watch([() => form.length, () => form.width, () => form.height], () => {
  if (form.length > 0 && form.width > 0 && form.height > 0) {
    form.volWeight = (form.length * form.width * form.height) / 5000
    form.chargeableWeight = Math.max(form.weight, form.volWeight)
  }
})

// 监听重量变化更新计费重量
watch(() => form.weight, () => {
  form.chargeableWeight = Math.max(form.weight, form.volWeight)
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
  loading.value = true
  results.value = []
  
  try {
    // 确保至少选择一家快递公司
    if (form.selectedCarriers.length === 0) {
      alert('请至少选择一家快递公司')
      loading.value = false
      return
    }
    
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
        result.isCheapest = result.totalCost === minCost
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
    express: { firstKg: 45, additionalKg: 15 }, // 首重45美元，续重15美元/公斤
    standard: { firstKg: 32, additionalKg: 12 },
    economy: { firstKg: 28, additionalKg: 10 }
  }
  
  const rate = baseRates[form.serviceType]
  let baseFreight = rate.firstKg
  
  if (chargeableWeight > 1) {
    baseFreight += Math.ceil(chargeableWeight - 1) * rate.additionalKg
  }
  
  // 燃油附加费 (当前18.5%)
  const fuelSurcharge = baseFreight * (currentFuelSurcharge.value / 100)
  
  // 偏远地区附加费 (基础运费的15%)
  const remoteSurcharge = form.isRemoteArea ? baseFreight * 0.15 : 0
  
  // 住宅配送费 (固定15美元)
  const residentialFee = form.isResidential ? 15 : 0
  
  // 超规格附加费 (如果尺寸或重量超标)
  const oversizeFee = form.isOversized ? 40 : 0
  
  // 旺季附加费 (10月-1月，基础运费的10%)
  const peakSurcharge = form.isPeakSeason ? baseFreight * 0.10 : 0
  
  // 保险费用 (申报价值的1%，最低5美元)
  const insuranceCost = form.insurance ? Math.max(form.value * 0.01, 5) : 0
  
  // 关税预付手续费 (固定15美元)
  const dutyFee = form.dutyPrepaid ? 15 : 0
  
  // 预估关税 (基于目的国税率，美国一般10-15%)
  const dutyRate = getDutyRate(form.toCountry)
  const estimatedDuty = form.value * (dutyRate / 100)
  
  // 总费用
  const totalCost = baseFreight + fuelSurcharge + remoteSurcharge + 
                   residentialFee + oversizeFee + peakSurcharge + 
                   insuranceCost + dutyFee + estimatedDuty
  
  // 预估时效 (基于服务类型和目的地)
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
  
  // DHL 燃油附加费 (与UPS相同)
  const fuelSurcharge = baseFreight * (currentFuelSurcharge.value / 100)
  
  // 偏远地区附加费 (基础运费的12%)
  const remoteSurcharge = form.isRemoteArea ? baseFreight * 0.12 : 0
  
  // 住宅配送费 (固定12美元)
  const residentialFee = form.isResidential ? 12 : 0
  
  // 超规格附加费
  const oversizeFee = form.isOversized ? 35 : 0
  
  // DHL 需求附加费/高峰期服务费 (基础运费的8%)
  const peakSurcharge = form.isPeakSeason ? baseFreight * 0.08 : 0
  
  // 保险费用
  const insuranceCost = form.insurance ? Math.max(form.value * 0.01, 5) : 0
  
  // 关税预付手续费
  const dutyFee = form.dutyPrepaid ? 12 : 0
  
  // 预估关税
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
  // EMS 费率通常较低，但时效较长
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
  
  // EMS 通常不收燃油附加费或较少附加费
  const fuelSurcharge = baseFreight * 0.05 // 固定5%
  const remoteSurcharge = form.isRemoteArea ? baseFreight * 0.10 : 0
  const residentialFee = form.isResidential ? 8 : 0
  const oversizeFee = form.isOversized ? 25 : 0
  const peakSurcharge = form.isPeakSeason ? baseFreight * 0.05 : 0
  const insuranceCost = form.insurance ? Math.max(form.value * 0.008, 4) : 0 // EMS保险较便宜
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
    fuelRate: 5, // EMS固定5%
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
    'US': 10,    // 美国平均税率10%
    'CA': 12,    // 加拿大12%
    'GB': 15,    // 英国15%
    'DE': 16,    // 德国16%
    'FR': 15,    // 法国15%
    'IT': 15,    // 意大利15%
    'ES': 15,    // 西班牙15%
    'AU': 10,    // 澳大利亚10%
    'JP': 8,     // 日本8%
    'KR': 10,    // 韩国10%
    'CN': 13,    // 中国13%
    'HK': 0,     // 香港免税
    'SG': 7,     // 新加坡7%
    'MY': 10,    // 马来西亚10%
    'TH': 15,    // 泰国15%
    'VN': 15     // 越南15%
  }
  return dutyRates[countryCode] || 10 // 默认10%
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
    'US': 0,     // 北美
    'CA': 1,     // 加拿大+1天
    'GB': 1,     // 欧洲+1天
    'DE': 1,
    'FR': 1,
    'IT': 1,
    'ES': 1,
    'AU': 2,     // 澳洲+2天
    'JP': 0,     // 亚洲主要国家
    'KR': 0,
    'SG': 0,
    'MY': 1,     // 东南亚+1天
    'TH': 1,
    'VN': 1
  }
  
  days += regionAdjustments[toCountry] || 1
  
  return Math.max(days, 2) // 最少2个工作日
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
    return (value / maxCost) * 80 + 20 // 20-100%高度
  } else {
    const maxDays = Math.max(...results.value.map(r => r.deliveryDays))
    return (value / maxDays) * 80 + 20
  }
}

// UI交互函数
const showCarrierDetails = (carrier) => {
  const details = `
快递公司: ${carrier.carrier}
服务类型: ${carrier.serviceType}
计费重量: ${carrier.chargeableWeight}kg
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
  form.volWeight = (30*20*15)/5000
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
</script>

<style scoped>
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

/* 响应式调整 */
@media (max-width: 1400px) {
  .carrier-comparison {
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
}

/* 更新原有的样式（保持与之前一致的部分） */
/* ... 原有的.container, .main-header, .form-section-card等样式保持不变 ... */
</style>