<template>
  <div class="container">
    <!-- 顶部广告横幅 -->
    <div class="ad-banner top-banner">
      <div class="ad-placeholder">
        <h3>广告位 (Google AdSense)</h3>
        <p>此区域可放置您的广告代码，最大宽度支持2400px</p>
      </div>
    </div>

    <!-- 主标题区域 -->
    <header class="main-header">
      <div class="header-content">
        <div class="logo-area">
          <h1 class="main-title">📦 USPS, UPS & DHL国际运费与关税计算器</h1>
          <p class="main-subtitle">根据您的需求，shipping fee可帮助您选择最适合您的运输服务及预计送达时间</p>
        </div>
        <div class="header-info">
          <div class="info-card">
            <div class="info-icon">⚡</div>
            <div class="info-text">
              <h4>实时费率</h4>
              <p>对接 USPS, UPS & DHL官方API</p>
            </div>
          </div>
          <div class="info-card">
            <div class="info-icon">🌍</div>
            <div class="info-text">
              <h4>全球覆盖</h4>
              <p>200+国家地区</p>
            </div>
          </div>
          <div class="info-card">
            <div class="info-icon">💰</div>
            <div class="info-text">
              <h4>关税预估</h4>
              <p>智能计算到岸成本</p>
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
          <h2 class="section-title">1. 填写货运信息</h2>
          <p class="section-desc">输入包裹详情以获取准确的运费估算</p>
        </div>
        
        <div class="form-container">
          <!-- 发货地信息 -->
          <div class="form-section-card">
            <h3 class="form-subtitle">发货地信息</h3>
            <div class="form-grid">
              <div class="form-group large">
                <label for="fromCountry">发货国家/地区</label>
                <select id="fromCountry" v-model="form.fromCountry" @change="updateFromStates">
                  <option value="US">美国 United States</option>
                  <option value="CN">中国 China</option>
                  <option value="DE">德国 Germany</option>
                  <option value="GB">英国 United Kingdom</option>
                  <option value="JP">日本 Japan</option>
                  <option value="CA">加拿大 Canada</option>
                  <option value="AU">澳大利亚 Australia</option>
                </select>
              </div>
              
              <div class="form-group large">
                <label for="fromPostal">邮政编码</label>
                <input 
                  id="fromPostal" 
                  v-model="form.fromPostal" 
                  placeholder="例如: 10001 (纽约)"
                  required
                >
              </div>
            </div>
          </div>

          <!-- 收货地信息 -->
          <div class="form-section-card">
            <h3 class="form-subtitle">收货地信息</h3>
            <div class="form-grid">
              <div class="form-group large">
                <label for="toCountry">收货国家/地区</label>
                <select id="toCountry" v-model="form.toCountry">
                  <option value="US">美国 United States</option>
                  <option value="CN">中国 China</option>
                  <option value="DE">德国 Germany</option>
                  <option value="GB">英国 United Kingdom</option>
                  <option value="JP">日本 Japan</option>
                  <option value="CA">加拿大 Canada</option>
                  <option value="AU">澳大利亚 Australia</option>
                  <option value="FR">法国 France</option>
                  <option value="IT">意大利 Italy</option>
                  <option value="ES">西班牙 Spain</option>
                </select>
              </div>
              
              <div class="form-group large">
                <label for="toPostal">邮政编码</label>
                <input 
                  id="toPostal" 
                  v-model="form.toPostal" 
                  placeholder="例如: 200001 (上海)"
                  required
                >
              </div>
            </div>
          </div>

          <!-- 包裹详细信息 -->
          <div class="form-section-card">
            <h3 class="form-subtitle">包裹详细信息</h3>
            <div class="form-grid triple">
              <div class="form-group">
                <label for="weight">重量 (kg)</label>
                <input 
                  id="weight" 
                  v-model.number="form.weight" 
                  type="number" 
                  min="0.1" 
                  step="0.1"
                  placeholder="例如: 2.5"
                  required
                >
                <p class="helper-text">最小: 0.1kg</p>
              </div>
              
              <div class="form-group">
                <label for="length">长度 (cm)</label>
                <input 
                  id="length" 
                  v-model.number="form.length" 
                  type="number" 
                  min="1"
                  placeholder="30"
                >
              </div>
              
              <div class="form-group">
                <label for="width">宽度 (cm)</label>
                <input 
                  id="width" 
                  v-model.number="form.width" 
                  type="number" 
                  min="1"
                  placeholder="20"
                >
              </div>
              
              <div class="form-group">
                <label for="height">高度 (cm)</label>
                <input 
                  id="height" 
                  v-model.number="form.height" 
                  type="number" 
                  min="1"
                  placeholder="15"
                >
              </div>
              
              <div class="form-group">
                <label for="value">货物价值 (USD)</label>
                <input 
                  id="value" 
                  v-model.number="form.value" 
                  type="number" 
                  min="0"
                  step="10"
                  placeholder="例如: 100"
                >
                <p class="helper-text">用于关税计算</p>
              </div>
              
              <div class="form-group">
                <label for="packageType">包裹类型</label>
                <select id="packageType" v-model="form.packageType">
                  <option value="02">标准包裹</option>
                  <option value="01">UPS信封</option>
                  <option value="03">UPS管状包裹</option>
                  <option value="04">UPS纸箱</option>
                </select>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="action-buttons">
            <button 
              class="calculate-btn primary-btn" 
              @click="calculateShipping"
              :disabled="loading || !formValid"
            >
              <span class="btn-icon">🚀</span>
              <span class="btn-text">{{ loading ? '正在计算中...' : '立即计算运费与关税' }}</span>
            </button>
            
            <button class="secondary-btn" @click="resetForm">
              <span class="btn-icon">🔄</span>
              <span class="btn-text">重置表单</span>
            </button>
          </div>
        </div>
      </section>

      <!-- 中间：结果显示区域 -->
      <section class="results-section" v-if="results.length > 0">
        <div class="section-header">
          <h2 class="section-title">2. 运费与关税估算结果</h2>
          <p class="section-desc">基于您输入的信息，以下为UPS各服务的详细报价</p>
        </div>
        
        <!-- 摘要卡片 -->
        <div class="summary-container">
          <div class="summary-card highlight">
            <div class="summary-icon">💰</div>
            <div class="summary-content">
              <h4>最经济选择</h4>
              <p class="summary-price">{{ cheapestService?.total || 'N/A' }}</p>
              <p class="summary-service">{{ cheapestService?.service || '' }}</p>
              <p class="summary-desc">性价比最高的运输方案</p>
            </div>
          </div>
          
          <div class="summary-card highlight accent">
            <div class="summary-icon">⚡</div>
            <div class="summary-content">
              <h4>最快速选择</h4>
              <p class="summary-price">{{ fastestService?.total || 'N/A' }}</p>
              <p class="summary-service">{{ fastestService?.service || '' }}</p>
              <p class="summary-desc">时效优先的快递方案</p>
            </div>
          </div>
          
          <div class="summary-card">
            <div class="summary-icon">📦</div>
            <div class="summary-content">
              <h4>包裹概览</h4>
              <p class="summary-detail">重量: {{ form.weight }} kg</p>
              <p class="summary-detail">目的地: {{ getCountryName(form.toCountry) }}</p>
              <p class="summary-detail">价值: ${{ form.value }}</p>
            </div>
          </div>
        </div>

        <!-- 详细结果表格 -->
        <div class="results-table-container">
          <h3 class="table-title">UPS服务详情对比</h3>
          <div class="table-wrapper">
            <table class="results-table">
              <thead>
                <tr>
                  <th class="service-col">服务类型</th>
                  <th class="price-col">运费</th>
                  <th class="price-col">关税/税费</th>
                  <th class="price-col total-col">总费用</th>
                  <th class="delivery-col">预估时效</th>
                  <th class="action-col">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(result, index) in results" :key="index" :class="{ 'recommended': result.service.includes('Express') }">
                  <td class="service-cell">
                    <div class="service-name">{{ result.service }}</div>
                    <div class="service-desc">{{ result.description }}</div>
                  </td>
                  <td class="price-cell">
                    <div class="price-amount">{{ result.shipping }}</div>
                  </td>
                  <td class="price-cell">
                    <div class="price-amount">{{ result.tax }}</div>
                    <div class="tax-note">预估关税</div>
                  </td>
                  <td class="price-cell total-cell">
                    <div class="total-amount">{{ result.total }}</div>
                    <div class="total-note">到岸总成本</div>
                  </td>
                  <td class="delivery-cell">
                    <div class="delivery-time">{{ result.delivery }}</div>
                    <div class="delivery-note">工作日</div>
                  </td>
                  <td class="action-cell">
                    <button class="details-btn" @click="showDetails(result)">
                      查看详情
                    </button>
                    <button class="select-btn" @click="selectService(result)">
                      选择此服务
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 信息提示 -->
        <div class="info-notice">
          <div class="notice-header">
            <span class="notice-icon">ℹ️</span>
            <h4>重要提示与免责声明</h4>
          </div>
          <ul class="notice-list">
            <li>以上费用为基于当前市场条件的预估金额，最终费用可能因燃油附加费、汇率波动等因素而有所不同。</li>
            <li>关税和税费会根据目的地国家的法规、商品分类和价值而变化，最终金额以海关核定为准。</li>
            <li>配送时效为工作日估算，不包括清关延误、天气因素或节假日影响。</li>
            <li>实际运费以UPS最终账单为准，建议在发货前与UPS官方确认最新费率。</li>
            <li>本工具提供的计算结果仅供参考，不构成任何运输合同或承诺。</li>
          </ul>
        </div>
      </section>

      <!-- 右侧：信息与SEO内容区域 -->
      <aside class="info-section" v-if="results.length === 0">
        <div class="info-content">
          <div class="info-card">
            <h3 class="info-title">📊 如何使用本计算器</h3>
            <ol class="info-list">
              <li>在左侧填写完整的发货地与收货地信息</li>
              <li>准确输入包裹的尺寸、重量和申报价值</li>
              <li>点击"立即计算"按钮获取实时报价</li>
              <li>比较不同UPS服务的价格与时效</li>
              <li>选择合适的运输方案进行后续操作</li>
            </ol>
          </div>
          
          <div class="info-card">
            <h3 class="info-title">🚀 UPS服务类型说明</h3>
            <ul class="info-list">
              <li><strong>UPS Worldwide Express</strong>：最快的国际快递服务，1-3个工作日送达，适用于紧急文件和高价值货物。</li>
              <li><strong>UPS Worldwide Saver</strong>：经济型国际快递服务，2-5个工作日送达，平衡了速度与成本。</li>
              <li><strong>UPS Standard</strong>：最经济的国际陆运服务，5-10个工作日送达，适用于不紧急的大件货物。</li>
              <li><strong>UPS Expedited</strong>：加急服务，提供比标准服务更快的配送选项。</li>
            </ul>
          </div>
          
          <div class="info-card">
            <h3 class="info-title">💡 节省运费小贴士</h3>
            <ul class="info-list">
              <li>准确测量包裹尺寸和重量，避免因尺寸重量误差产生额外费用。</li>
              <li>合理申报货物价值，既能确保保险覆盖，又能优化关税成本。</li>
              <li>比较不同服务的性价比，非紧急货物可选择标准服务节省费用。</li>
              <li>关注UPS的促销活动和季节性折扣，可能获得额外优惠。</li>
              <li>考虑使用UPS的批量折扣计划，如果经常有发货需求。</li>
            </ul>
          </div>
          
          <div class="info-card">
            <h3 class="info-title">🌍 关税计算原理</h3>
            <p class="info-text">本工具根据以下因素估算关税：</p>
            <ul class="info-list">
              <li><strong>货物申报价值</strong>：商品本身的价值，关税计算的基础。</li>
              <li><strong>目的地国家税率</strong>：不同国家、不同商品类别的进口税率不同。</li>
              <li><strong>附加费用</strong>：可能包括增值税、消费税、海关处理费等。</li>
              <li><strong>贸易协定</strong>：某些国家间的贸易协定可能提供关税优惠。</li>
            </ul>
            <p class="info-note">注意：关税估算仅供参考，实际金额以目的地海关核定为准。</p>
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
          <h4 class="footer-title">UPS运费计算器</h4>
          <p class="footer-text">提供UPS国际快递运费与关税的实时估算服务，帮助您做出明智的物流决策。</p>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">快速链接</h4>
          <ul class="footer-links">
            <li><a href="/privacy">隐私政策</a></li>
            <li><a href="/terms">服务条款</a></li>
            <li><a href="/contact">联系我们</a></li>
            <li><a href="/sitemap">网站地图</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">相关资源</h4>
          <ul class="footer-links">
            <li><a href="https://www.ups.com" target="_blank">UPS官方网站</a></li>
            <li><a href="https://www.ups.com/ratetool" target="_blank">UPS官方费率工具</a></li>
            <li><a href="/blog">物流知识博客</a></li>
            <li><a href="/tools">其他物流工具</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">支持与反馈</h4>
          <p class="footer-text">如有问题或建议，请通过以下方式联系我们：</p>
          <p class="footer-contact">Email: support@ups-calculator.com</p>
          <div class="footer-social">
            <span class="social-icon">📧</span>
            <span class="social-icon">🐦</span>
            <span class="social-icon">💬</span>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">© 2023 UPS国际运费计算器 | 本工具为独立第三方服务，与UPS公司无直接关联 | 数据仅供参考，实际费用以UPS官方账单为准</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

// 表单数据
const form = reactive({
  fromCountry: 'US',
  fromPostal: '10001',
  toCountry: 'CN',
  toPostal: '200001',
  weight: 2.5,
  length: 30,
  width: 20,
  height: 15,
  value: 100,
  packageType: '02'
})

// 状态管理
const loading = ref(false)
const error = ref('')
const results = ref([])

// 计算属性
const formValid = computed(() => {
  return form.fromPostal && form.toPostal && form.weight > 0
})

const cheapestService = computed(() => {
  if (results.value.length === 0) return null
  return results.value.reduce((min, curr) => {
    const minVal = parseFloat(min.total.replace('$', ''))
    const currVal = parseFloat(curr.total.replace('$', ''))
    return currVal < minVal ? curr : min
  })
})

const fastestService = computed(() => {
  if (results.value.length === 0) return null
  return results.value.find(r => r.service.includes('Express')) || results.value[0]
})

// 方法
const calculateShipping = async () => {
  if (!formValid.value) return
  
  loading.value = true
  error.value = ''
  results.value = []
  
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 开发环境：使用模拟数据
    results.value = getMockData()
  } catch (err) {
    console.error('计算错误:', err)
    error.value = '计算过程中出现错误，请稍后重试'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.fromCountry = 'US'
  form.fromPostal = '10001'
  form.toCountry = 'CN'
  form.toPostal = '200001'
  form.weight = 2.5
  form.length = 30
  form.width = 20
  form.height = 15
  form.value = 100
  form.packageType = '02'
  results.value = []
  error.value = ''
}

const showDetails = (service) => {
  alert(`服务详情:\n\n服务: ${service.service}\n描述: ${service.description}\n运费: ${service.shipping}\n关税: ${service.tax}\n总费用: ${service.total}\n时效: ${service.delivery}`)
}

const selectService = (service) => {
  alert(`已选择: ${service.service}\n总费用: ${service.total}\n您将被引导至UPS官方网站完成后续操作。`)
}

const getCountryName = (code) => {
  const countries = {
    'US': '美国',
    'CN': '中国',
    'DE': '德国',
    'GB': '英国',
    'JP': '日本',
    'CA': '加拿大',
    'AU': '澳大利亚',
    'FR': '法国',
    'IT': '意大利',
    'ES': '西班牙'
  }
  return countries[code] || code
}

// 开发环境模拟数据
const getMockData = () => {
  return [
    {
      service: 'UPS Worldwide Express',
      description: '最快的国际快递服务，优先处理，全程跟踪',
      shipping: '$68.50',
      tax: '$15.20',
      total: '$83.70',
      delivery: '1-3个工作日',
      details: {
        baseCharge: 65.00,
        fuelSurcharge: 3.50,
        taxRate: '18%'
      }
    },
    {
      service: 'UPS Worldwide Saver',
      description: '经济型国际快递服务，性价比高',
      shipping: '$45.30',
      tax: '$12.50',
      total: '$57.80',
      delivery: '2-5个工作日',
      details: {
        baseCharge: 42.00,
        fuelSurcharge: 3.30,
        taxRate: '18%'
      }
    },
    {
      service: 'UPS Expedited',
      description: '加急国际服务，比标准服务更快',
      shipping: '$52.10',
      tax: '$13.80',
      total: '$65.90',
      delivery: '3-6个工作日',
      details: {
        baseCharge: 48.00,
        fuelSurcharge: 4.10,
        taxRate: '18%'
      }
    },
    {
      service: 'UPS Standard',
      description: '最经济的国际陆运服务',
      shipping: '$28.90',
      tax: '$8.70',
      total: '$37.60',
      delivery: '5-10个工作日',
      details: {
        baseCharge: 26.00,
        fuelSurcharge: 2.90,
        taxRate: '18%'
      }
    }
  ]
}

const updateFromStates = () => {
  // 可根据选择的发货国家更新州/省选项
  console.log('发货国家变更为:', form.fromCountry)
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
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

.form-group.large {
  grid-column: span 1;
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

.helper-text {
  font-size: 14px;
  color: #64748b;
  margin-top: 8px;
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

.secondary-btn {
  flex: 1;
  background: #f1f5f9;
  color: #475569;
  border: 2px solid #cbd5e1;
}

.secondary-btn:hover {
  background: #e2e8f0;
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  font-size: 24px;
}

.btn-text {
  font-size: 20px;
}

/* 结果区域样式 */
.results-section {
  grid-column: span 1;
}

.summary-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 50px;
}

.summary-card {
  background: white;
  border-radius: 16px;
  padding: 35px;
  border: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 25px;
  transition: transform 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-5px);
}

.summary-card.highlight {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
  border: none;
}

.summary-card.highlight.accent {
  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
}

.summary-icon {
  font-size: 48px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}

.summary-content h4 {
  font-size: 22px;
  margin-bottom: 10px;
  font-weight: 700;
}

.summary-price {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 8px;
}

.summary-service {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 5px;
}

.summary-desc,
.summary-detail {
  font-size: 16px;
  opacity: 0.8;
}

.summary-detail {
  margin-bottom: 5px;
}

/* 结果表格样式 */
.results-table-container {
  margin-bottom: 50px;
}

.table-title {
  font-size: 26px;
  color: #1e293b;
  margin-bottom: 25px;
  font-weight: 700;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
}

.results-table thead {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
}

.results-table th {
  padding: 25px 20px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  border-bottom: 2px solid #e2e8f0;
}

.results-table td {
  padding: 25px 20px;
  border-bottom: 1px solid #e2e8f0;
}

.results-table tbody tr {
  transition: background-color 0.2s ease;
}

.results-table tbody tr:hover {
  background-color: #f8fafc;
}

.results-table tbody tr.recommended {
  background-color: #f0f9ff;
  border-left: 4px solid #3b82f6;
}

.service-cell {
  min-width: 300px;
}

.service-name {
  font-size: 20px;
  color: #1e293b;
  font-weight: 600;
  margin-bottom: 8px;
}

.service-desc {
  font-size: 16px;
  color: #64748b;
}

.price-cell {
  min-width: 150px;
}

.price-amount {
  font-size: 22px;
  color: #1e293b;
  font-weight: 600;
}

.tax-note {
  font-size: 14px;
  color: #64748b;
  margin-top: 5px;
}

.total-cell .price-amount {
  font-size: 26px;
  color: #10b981;
}

.total-note {
  font-size: 14px;
  color: #10b981;
  margin-top: 5px;
}

.delivery-cell {
  min-width: 150px;
}

.delivery-time {
  font-size: 20px;
  color: #1e293b;
  font-weight: 600;
}

.delivery-note {
  font-size: 14px;
  color: #64748b;
  margin-top: 5px;
}

.action-cell {
  min-width: 200px;
}

.details-btn,
.select-btn {
  padding: 14px 24px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
  width: 100%;
}

.details-btn {
  background: #f1f5f9;
  color: #475569;
}

.details-btn:hover {
  background: #e2e8f0;
}

.select-btn {
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
}

.select-btn:hover {
  background: linear-gradient(135deg, #0da271 0%, #2bb884 100%);
  transform: translateY(-2px);
}

/* 信息提示区域 */
.info-notice {
  background: #fff7ed;
  border: 2px solid #fed7aa;
  border-radius: 16px;
  padding: 35px;
  margin-top: 40px;
}

.notice-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
}

.notice-icon {
  font-size: 32px;
}

.notice-header h4 {
  font-size: 24px;
  color: #9a3412;
  font-weight: 700;
}

.notice-list {
  list-style-type: none;
}

.notice-list li {
  font-size: 18px;
  color: #7c2d12;
  margin-bottom: 15px;
  padding-left: 10px;
  position: relative;
  line-height: 1.5;
}

.notice-list li:before {
  content: "•";
  color: #f97316;
  font-size: 24px;
  position: absolute;
  left: -15px;
  top: -2px;
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

.info-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 30px;
  border: 1px solid #e2e8f0;
}

.info-title {
  font-size: 24px;
  color: #1e293b;
  margin-bottom: 20px;
  font-weight: 700;
  padding-bottom: 15px;
  border-bottom: 2px solid #e2e8f0;
}

.info-list {
  list-style-type: none;
}

.info-list li {
  font-size: 17px;
  color: #475569;
  margin-bottom: 15px;
  padding-left: 10px;
  position: relative;
  line-height: 1.5;
}

.info-list li:before {
  content: "›";
  color: #4f46e5;
  font-size: 20px;
  position: absolute;
  left: -15px;
}

.info-text {
  font-size: 17px;
  color: #475569;
  margin-bottom: 15px;
  line-height: 1.5;
}

.info-note {
  font-size: 15px;
  color: #64748b;
  font-style: italic;
  margin-top: 15px;
  padding: 15px;
  background: white;
  border-radius: 10px;
  border-left: 4px solid #94a3b8;
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
}

.footer-links a:hover {
  color: #4f46e5;
}

.footer-contact {
  font-size: 17px;
  color: #cbd5e1;
  margin-bottom: 20px;
}

.footer-social {
  display: flex;
  gap: 20px;
}

.social-icon {
  font-size: 28px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.social-icon:hover {
  transform: translateY(-3px);
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
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
  
  .summary-container {
    grid-template-columns: repeat(2, 1fr);
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
  
  .summary-container {
    grid-template-columns: 1fr;
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
  .select-btn {
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