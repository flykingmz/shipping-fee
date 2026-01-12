<template>
  <div class="container">
    <header>
      <h1>📦 UPS国际运费计算器</h1>
      <p class="subtitle">实时查询UPS快递运费与关税，支持全球目的地</p>
    </header>

    <!-- 广告位：这是您未来放置Google AdSense的地方 -->
    <div class="ad-banner">
      <div class="ad-placeholder">
        <small>广告位 (未来放置Google AdSense代码)</small>
      </div>
    </div>

    <main class="calculator">
      <!-- 输入表单 -->
      <div class="form-section">
        <div class="form-group">
          <label for="fromCountry">发货国家</label>
          <select id="fromCountry" v-model="form.fromCountry" @change="updateFromStates">
            <option value="US">美国</option>
            <option value="CN">中国</option>
            <option value="DE">德国</option>
            <option value="GB">英国</option>
            <option value="JP">日本</option>
          </select>
        </div>

        <div class="form-group">
          <label for="fromPostal">发货地邮编</label>
          <input 
            id="fromPostal" 
            v-model="form.fromPostal" 
            placeholder="例如: 10001"
            required
          >
        </div>

        <div class="form-group">
          <label for="toCountry">收货国家</label>
          <select id="toCountry" v-model="form.toCountry">
            <option value="US">美国</option>
            <option value="CN">中国</option>
            <option value="DE">德国</option>
            <option value="GB">英国</option>
            <option value="JP">日本</option>
            <option value="CA">加拿大</option>
            <option value="AU">澳大利亚</option>
          </select>
        </div>

        <div class="form-group">
          <label for="toPostal">目的地邮编</label>
          <input 
            id="toPostal" 
            v-model="form.toPostal" 
            placeholder="例如: 200001"
            required
          >
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="weight">包裹重量 (kg)</label>
            <input 
              id="weight" 
              v-model.number="form.weight" 
              type="number" 
              min="0.1" 
              step="0.1"
              placeholder="例如: 2.5"
              required
            >
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
        </div>

        <div class="form-row">
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
        </div>

        <div class="form-group">
          <label for="value">货物声明价值 (USD)</label>
          <input 
            id="value" 
            v-model.number="form.value" 
            type="number" 
            min="0"
            step="10"
            placeholder="例如: 100"
          >
        </div>

        <button 
          class="calculate-btn" 
          @click="calculateShipping"
          :disabled="loading || !formValid"
        >
          {{ loading ? '计算中...' : '💰 计算运费与关税' }}
        </button>
      </div>

      <!-- 结果展示 -->
      <div class="results-section" v-if="results.length > 0">
        <h2>📊 计算结果</h2>
        
        <!-- 简要统计 -->
        <div class="summary-cards">
          <div class="card cheapest">
            <h3>最经济</h3>
            <p class="price">{{ cheapestService?.total || 'N/A' }}</p>
            <p class="service">{{ cheapestService?.service || '' }}</p>
          </div>
          <div class="card fastest">
            <h3>最快速</h3>
            <p class="price">{{ fastestService?.total || 'N/A' }}</p>
            <p class="service">{{ fastestService?.service || '' }}</p>
          </div>
        </div>

        <!-- 详细结果表格 -->
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>服务类型</th>
                <th>运费</th>
                <th>关税/税费</th>
                <th>总费用</th>
                <th>预估时效</th>
                <th>详情</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(result, index) in results" :key="index">
                <td>
                  <strong>{{ result.service }}</strong>
                  <br>
                  <small>{{ result.description }}</small>
                </td>
                <td class="price">{{ result.shipping }}</td>
                <td class="price">{{ result.tax }}</td>
                <td class="price total">{{ result.total }}</td>
                <td>{{ result.delivery }}</td>
                <td>
                  <button 
                    class="details-btn"
                    @click="showDetails(result)"
                  >
                    查看详情
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 重要声明 -->
        <div class="disclaimer">
          <h3>⚠️ 重要说明</h3>
          <ul>
            <li>以上费用为预估金额，最终费用可能有所不同</li>
            <li>关税和税费会根据目的地国家的法规而变化</li>
            <li>时效为工作日估算，不包括清关延误</li>
            <li>实际运费以UPS最终账单为准</li>
          </ul>
        </div>
      </div>

      <!-- 加载状态 -->
      <div class="loading" v-if="loading">
        <div class="spinner"></div>
        <p>正在查询UPS实时费率...</p>
      </div>

      <!-- 错误信息 -->
      <div class="error" v-if="error">
        <h3>❌ 出错了</h3>
        <p>{{ error }}</p>
        <button @click="retry">重试</button>
      </div>
    </main>

    <!-- SEO内容区域 - 提升搜索排名 -->
    <section class="seo-content">
      <h2>📝 关于UPS运费计算</h2>
      <p>本工具提供UPS国际快递服务的实时运费估算，包括：</p>
      <ul>
        <li><strong>UPS Worldwide Express</strong>：最快国际快递服务，1-3个工作日送达</li>
        <li><strong>UPS Worldwide Saver</strong>：经济型国际快递，2-5个工作日</li>
        <li><strong>UPS Standard</strong>：最经济的国际陆运服务</li>
        <li><strong>关税与税费预估</strong>：基于货物价值的到岸成本计算</li>
      </ul>
      <p>使用本运费计算器，您可以快速比较不同UPS服务的价格和时效，为您的国际货运做出最佳选择。</p>
    </section>

    <!-- 另一个广告位 -->
    <div class="ad-banner">
      <div class="ad-placeholder">
        <small>广告位 (未来放置Google AdSense代码)</small>
      </div>
    </div>

    <footer>
      <p>© 2023 UPS运费计算器 | 本工具为第三方服务，与UPS无直接关联</p>
      <p class="privacy-link">
        <a href="/privacy">隐私政策</a> | 
        <a href="/terms">使用条款</a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import axios from 'axios'

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
  value: 100
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
    // 这里调用我们的Vercel无服务器函数
    const response = await axios.post('/api/ups-quote', {
      fromCountry: form.fromCountry,
      fromPostal: form.fromPostal,
      toCountry: form.toCountry,
      toPostal: form.toPostal,
      weight: form.weight,
      dimensions: {
        length: form.length,
        width: form.width,
        height: form.height
      },
      value: form.value
    })
    
    if (response.data.success) {
      results.value = response.data.rates
    } else {
      error.value = response.data.error || '计算失败'
    }
  } catch (err) {
    console.error('API调用错误:', err)
    
    // 开发环境：使用模拟数据
    if (process.env.NODE_ENV === 'development') {
      console.log('使用模拟数据')
      results.value = getMockData()
    } else {
      error.value = '网络错误，请稍后重试'
    }
  } finally {
    loading.value = false
  }
}

const showDetails = (service) => {
  alert(`服务详情:\n${JSON.stringify(service, null, 2)}`)
}

const retry = () => {
  error.value = ''
}

// 开发环境模拟数据
const getMockData = () => {
  return [
    {
      service: 'UPS Worldwide Express',
      description: '最快国际快递',
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
      description: '经济型国际快递',
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
      service: 'UPS Standard',
      description: '国际陆运',
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
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.container {
  max-width: 2400px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.ad-banner {
  margin: 25px 0;
  text-align: center;
}

.ad-placeholder {
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  padding: 30px;
  color: #6c757d;
}

.calculator {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

@media (min-width: 768px) {
  .calculator {
    grid-template-columns: 1fr 1fr;
  }
}

.form-section, .results-section {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3498db;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.calculate-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.calculate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.calculate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.results-section h2 {
  margin-bottom: 25px;
  color: #2c3e50;
  text-align: center;
}

.summary-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: white;
}

.card.cheapest {
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
}

.card.fastest {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
}

.card .price {
  font-size: 28px;
  font-weight: bold;
  margin: 10px 0;
}

.card .service {
  font-size: 14px;
  opacity: 0.9;
}

.table-container {
  overflow-x: auto;
  margin-bottom: 25px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

thead {
  background: #2c3e50;
  color: white;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

tbody tr:hover {
  background: #f8f9fa;
}

.price {
  font-weight: 600;
}

.price.total {
  color: #27ae60;
  font-size: 18px;
}

.details-btn {
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.details-btn:hover {
  background: #2980b9;
}

.disclaimer {
  background: #fff8e1;
  border-left: 4px solid #ffb300;
  padding: 20px;
  border-radius: 8px;
  margin-top: 25px;
}

.disclaimer h3 {
  color: #ff8f00;
  margin-bottom: 10px;
}

.disclaimer ul {
  list-style-position: inside;
  color: #5d4037;
}

.loading {
  text-align: center;
  padding: 40px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  background: #ffebee;
  border: 1px solid #ef5350;
  border-radius: 8px;
  padding: 25px;
  text-align: center;
}

.error h3 {
  color: #d32f2f;
  margin-bottom: 10px;
}

.error button {
  margin-top: 15px;
  padding: 10px 25px;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.seo-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  margin: 30px 0;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.seo-content h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.seo-content ul {
  margin: 20px 0;
  padding-left: 20px;
}

footer {
  text-align: center;
  padding: 30px;
  color: #7f8c8d;
  border-top: 1px solid #eee;
  margin-top: 30px;
}

.privacy-link a {
  color: #3498db;
  text-decoration: none;
  margin: 0 10px;
}

.privacy-link a:hover {
  text-decoration: underline;
}
</style>