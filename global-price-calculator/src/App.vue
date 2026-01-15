<template>
  <div id="app">
    <!-- 头部 -->
    <header class="header">
      <div class="header-content">
        <h1>🌍 Global Price Calculator</h1>
        <p class="subtitle">计算商品在全球主要国家/地区的含税价格、手续费和到手价</p>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 输入区域 -->
      <div class="input-section">
        <div class="input-group">
          <label for="basePrice">商品原价 (USD)</label>
          <div class="price-input-wrapper">
            <span class="currency-symbol">$</span>
            <input
              id="basePrice"
              type="number"
              v-model.number="basePrice"
              min="0"
              step="0.01"
              placeholder="输入商品价格"
              @input="calculatePrices"
            />
          </div>
        </div>

        <div class="input-group">
          <label for="countrySelect">选择国家/地区</label>
          <select
            id="countrySelect"
            v-model="selectedCountry"
            @change="calculatePrices"
          >
            <option value="">-- 请选择国家/地区 --</option>
            <optgroup v-for="(countries, region) in regions" :key="region" :label="regionLabels[region]">
              <option
                v-for="country in countries"
                :key="country.country"
                :value="country"
              >
                {{ country.chineseName }} ({{ country.country }}) - {{ country.rate }}
              </option>
            </optgroup>
          </select>
        </div>

        <div class="input-group">
          <label for="platformFeeRate">平台手续费率 (%)</label>
          <div class="slider-group">
            <input
              id="platformFeeRate"
              type="range"
              v-model.number="platformFeeRate"
              min="0"
              max="15"
              step="0.5"
              @input="calculatePrices"
              class="slider"
            />
            <span class="slider-value">{{ platformFeeRate }}%</span>
          </div>
        </div>

        <div class="input-group">
          <label>计算货币</label>
          <div class="currency-buttons">
            <button
              v-for="currency in currencies"
              :key="currency.code"
              @click="selectedCurrency = currency.code; calculatePrices()"
              :class="{ active: selectedCurrency === currency.code }"
              class="currency-btn"
            >
              {{ currency.symbol }} {{ currency.code }}
            </button>
          </div>
        </div>
      </div>

      <!-- 结果展示区域 -->
      <div v-if="showResults" class="results-section">
        <div class="country-info-card">
          <h3>{{ selectedCountry.chineseName }} ({{ selectedCountry.country }})</h3>
          <p class="tax-info">标准税率: {{ selectedCountry.rate }}</p>
        </div>

        <div class="results-grid">
          <div class="result-card">
            <div class="result-label">商品原价</div>
            <div class="result-value">{{ formatCurrency(basePrice) }}</div>
            <div class="result-desc">税前价格</div>
          </div>

          <div class="result-card tax-card">
            <div class="result-label">税费金额</div>
            <div class="result-value">{{ formatCurrency(taxAmount) }}</div>
            <div class="result-desc">增值税/消费税</div>
          </div>

          <div class="result-card final-price-card">
            <div class="result-label">含税价</div>
            <div class="result-value">{{ formatCurrency(finalPrice) }}</div>
            <div class="result-desc">消费者支付价格</div>
          </div>

          <div class="result-card fee-card">
            <div class="result-label">平台手续费</div>
            <div class="result-value">{{ formatCurrency(platformFee) }}</div>
            <div class="result-desc">{{ platformFeeRate }}% 费率</div>
          </div>

          <div class="result-card net-price-card">
            <div class="result-label">到手价</div>
            <div class="result-value">{{ formatCurrency(netPrice) }}</div>
            <div class="result-desc">卖家实际收入</div>
          </div>
        </div>

        <div class="breakdown-section">
          <h4>价格构成分析</h4>
          <div class="breakdown-bar">
            <div
              class="bar-segment original-bar"
              :style="{ width: pricePercentage + '%' }"
              :title="'原价: ' + pricePercentage.toFixed(1) + '%'"
            >
              <span v-if="pricePercentage > 15">原价 {{ pricePercentage.toFixed(1) }}%</span>
            </div>
            <div
              class="bar-segment tax-bar"
              :style="{ width: taxPercentage + '%' }"
              :title="'税费: ' + taxPercentage.toFixed(1) + '%'"
            >
              <span v-if="taxPercentage > 15">税费 {{ taxPercentage.toFixed(1) }}%</span>
            </div>
            <div
              class="bar-segment fee-bar"
              :style="{ width: feePercentage + '%' }"
              :title="'手续费: ' + feePercentage.toFixed(1) + '%'"
            >
              <span v-if="feePercentage > 15">手续费 {{ feePercentage.toFixed(1) }}%</span>
            </div>
          </div>
          <div class="breakdown-legend">
            <div class="legend-item">
              <span class="legend-color original-color"></span>
              <span>商品原价</span>
            </div>
            <div class="legend-item">
              <span class="legend-color tax-color"></span>
              <span>税费</span>
            </div>
            <div class="legend-item">
              <span class="legend-color fee-color"></span>
              <span>平台手续费</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 无结果时的提示 -->
      <div v-else class="placeholder-section">
        <div class="placeholder-icon">💰</div>
        <h3>开始计算全球价格</h3>
        <p>请输入商品价格并选择国家/地区查看计算结果</p>
        <div class="examples">
          <p><strong>计算示例：</strong></p>
          <ul>
            <li><strong>德国</strong> (19% VAT): $100 商品 → $119 含税价</li>
            <li><strong>日本</strong> (10% 消费税): $100 商品 → $110 含税价</li>
            <li><strong>香港</strong> (0% 税): $100 商品 → $100 含税价</li>
          </ul>
        </div>
      </div>
    </main>

    <!-- 底部信息 -->
    <footer class="footer">
      <p class="disclaimer">
        注意：计算结果仅供参考。实际税率可能因商品类别、地区政策等因素而异，请以各国税务机关最新公告为准。
      </p>
      <p class="note">
        * 多档税率国家（如中国、印度）的计算中，默认采用该国的标准税率或第一档税率。
      </p>
      <p class="timestamp">数据更新: 2025年</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // 输入数据
      basePrice: 100,
      selectedCountry: null,
      platformFeeRate: 5.0,
      selectedCurrency: 'USD',
      
      // 计算结果
      taxAmount: 0,
      finalPrice: 0,
      platformFee: 0,
      netPrice: 0,
      pricePercentage: 0,
      taxPercentage: 0,
      feePercentage: 0,
      
      // 全球税率数据 (你提供的完整数据)
      regions: {
        Europe: [
          {"country": "Austria", "chineseName": "奥地利", "rate": "20"},
          {"country": "Belgium", "chineseName": "比利时", "rate": "21"},
          {"country": "Bulgaria", "chineseName": "保加利亚", "rate": "20"},
          {"country": "Croatia", "chineseName": "克罗地亚", "rate": "25"},
          {"country": "Czech Republic", "chineseName": "捷克", "rate": "21"},
          {"country": "Denmark", "chineseName": "丹麦", "rate": "25"},
          {"country": "France", "chineseName": "法国", "rate": "20"},
          {"country": "Germany", "chineseName": "德国", "rate": "19"},
          {"country": "Hungary", "chineseName": "匈牙利", "rate": "27"},
          {"country": "Ireland", "chineseName": "爱尔兰", "rate": "23"},
          {"country": "Italy", "chineseName": "意大利", "rate": "22"},
          {"country": "Netherlands", "chineseName": "荷兰", "rate": "21"},
          {"country": "Norway", "chineseName": "挪威", "rate": "25"},
          {"country": "Spain", "chineseName": "西班牙", "rate": "21"},
          {"country": "Sweden", "chineseName": "瑞典", "rate": "25"},
          {"country": "United Kingdom", "chineseName": "英国", "rate": "20"}
        ],
        Asia: [
          {"country": "China", "chineseName": "中国", "rate": "13 / 9 / 6*"},
          {"country": "India", "chineseName": "印度", "rate": "28 / 18 / 12 / 5 / 0*"},
          {"country": "Indonesia", "chineseName": "印度尼西亚", "rate": "10 / 11*"},
          {"country": "Japan", "chineseName": "日本", "rate": "10"},
          {"country": "Singapore", "chineseName": "新加坡", "rate": "7"},
          {"country": "Thailand", "chineseName": "泰国", "rate": "7"}
        ],
        AfricaAndMiddleEast: [
          {"country": "South Africa", "chineseName": "南非", "rate": "15"},
          {"country": "Kenya", "chineseName": "肯尼亚", "rate": "16"},
          {"country": "Nigeria", "chineseName": "尼日利亚", "rate": "7.5"},
          {"country": "Saudi Arabia", "chineseName": "沙特", "rate": "15"},
          {"country": "United Arab Emirates", "chineseName": "阿联酋", "rate": "5"}
        ],
        Americas: [
          {"country": "Canada", "chineseName": "加拿大", "rate": "5 (GST) + PST 省级"},
          {"country": "Mexico", "chineseName": "墨西哥", "rate": "16"},
          {"country": "United States", "chineseName": "美国", "rate": "0–约15+"},
          {"country": "Panama", "chineseName": "巴拿马", "rate": "7"}
        ],
        ZeroRateOrOther: [
          {"country": "Hong Kong", "chineseName": "香港", "rate": "0"},
          {"country": "Kuwait", "chineseName": "科威特", "rate": "0"},
          {"country": "Qatar", "chineseName": "卡塔尔", "rate": "0"},
          {"country": "Brunei", "chineseName": "文莱", "rate": "0"},
          {"country": "Bhutan", "chineseName": "不丹", "rate": "0"}
        ]
      },
      
      // 区域标签
      regionLabels: {
        Europe: '欧洲',
        Asia: '亚洲',
        AfricaAndMiddleEast: '非洲 / 中东',
        Americas: '美洲',
        ZeroRateOrOther: '零税率 / 其他'
      },
      
      // 货币选项
      currencies: [
        { code: 'USD', symbol: '$', rate: 1.0 },
        { code: 'EUR', symbol: '€', rate: 0.92 },
        { code: 'GBP', symbol: '£', rate: 0.79 },
        { code: 'JPY', symbol: '¥', rate: 149.0 },
        { code: 'CNY', symbol: '¥', rate: 7.29 }
      ]
    };
  },
  
  computed: {
    showResults() {
      return this.selectedCountry && this.basePrice > 0;
    },
    
    taxRate() {
      if (!this.selectedCountry) return 0;
      
      const rateStr = this.selectedCountry.rate.toString();
      
      // 处理各种税率格式:
      // 1. 简单数字 "10"
      // 2. 多档税率 "13 / 9 / 6*"
      // 3. 范围 "0–约15+"
      // 4. 复合描述 "5 (GST) + PST 省级"
      // 5. 带小数 "7.5"
      
      // 尝试提取第一个数字
      const match = rateStr.match(/(\d+(\.\d+)?)/);
      
      if (match) {
        const rate = parseFloat(match[1]);
        // 如果是百分比，转换为小数
        return rate / 100;
      }
      
      return 0;
    }
  },
  
  methods: {
    calculatePrices() {
      if (!this.selectedCountry || this.basePrice <= 0) {
        this.resetResults();
        return;
      }
      
      // 计算税费
      this.taxAmount = this.basePrice * this.taxRate;
      
      // 计算含税价
      this.finalPrice = this.basePrice + this.taxAmount;
      
      // 计算平台手续费
      this.platformFee = this.finalPrice * (this.platformFeeRate / 100);
      
      // 计算到手价
      this.netPrice = this.finalPrice - this.platformFee;
      
      // 计算百分比构成
      const total = this.finalPrice;
      if (total > 0) {
        this.pricePercentage = (this.basePrice / total) * 100;
        this.taxPercentage = (this.taxAmount / total) * 100;
        this.feePercentage = (this.platformFee / total) * 100;
      } else {
        this.pricePercentage = 0;
        this.taxPercentage = 0;
        this.feePercentage = 0;
      }
    },
    
    resetResults() {
      this.taxAmount = 0;
      this.finalPrice = 0;
      this.platformFee = 0;
      this.netPrice = 0;
      this.pricePercentage = 0;
      this.taxPercentage = 0;
      this.feePercentage = 0;
    },
    
    formatCurrency(amount) {
      const currency = this.currencies.find(c => c.code === this.selectedCurrency);
      if (!currency) return '$0.00';
      
      const convertedAmount = amount * currency.rate;
      
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: this.selectedCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(convertedAmount);
    }
  },
  
  mounted() {
    // 页面加载时默认选择德国作为示例
    this.selectedCountry = this.regions.Europe.find(c => c.country === 'Germany');
    this.calculatePrices();
  }
};
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  color: #333;
  line-height: 1.6;
  min-height: 100vh;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 头部样式 */
.header {
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  color: white;
  border-radius: 16px;
  padding: 40px 30px;
  margin-bottom: 30px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.header h1 {
  font-size: 2.8rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  font-weight: 300;
}

/* 主要内容区域 */
.main-content {
  background: white;
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* 输入区域 */
.input-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-group label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
}

.price-input-wrapper {
  position: relative;
}

.currency-symbol {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
  color: #7f8c8d;
}

input[type="number"], select {
  width: 100%;
  padding: 16px 20px;
  padding-left: 40px;
  border: 2px solid #e0e6ef;
  border-radius: 12px;
  font-size: 1.1rem;
  background: white;
  transition: all 0.3s ease;
}

input[type="number"]:focus, select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

/* 滑块样式 */
.slider-group {
  display: flex;
  align-items: center;
  gap: 20px;
}

.slider {
  flex: 1;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, #2ecc71 0%, #f39c12 50%, #e74c3c 100%);
  -webkit-appearance: none;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #3498db;
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.slider-value {
  min-width: 70px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  color: #2c3e50;
  background: #f8f9fa;
  padding: 10px 15px;
  border-radius: 10px;
  border: 2px solid #e0e6ef;
}

/* 货币按钮 */
.currency-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.currency-btn {
  padding: 12px 20px;
  border: 2px solid #e0e6ef;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 90px;
}

.currency-btn:hover {
  border-color: #bdc3c7;
  transform: translateY(-2px);
}

.currency-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

/* 国家信息卡片 */
.country-info-card {
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  padding: 25px 30px;
  border-radius: 12px;
  margin-bottom: 30px;
}

.country-info-card h3 {
  font-size: 1.8rem;
  margin-bottom: 8px;
}

.tax-info {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* 结果网格 */
.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.result-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px 20px;
  text-align: center;
  border: 1px solid #e0e6ef;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.result-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.result-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
}

.tax-card::before {
  background: #e74c3c;
}

.final-price-card::before {
  background: #2ecc71;
}

.fee-card::before {
  background: #f39c12;
}

.net-price-card::before {
  background: #3498db;
}

.result-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.result-value {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: #2c3e50;
}

.result-desc {
  font-size: 0.85rem;
  color: #95a5a6;
}

.final-price-card {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  border: none;
}

.final-price-card .result-label,
.final-price-card .result-value,
.final-price-card .result-desc {
  color: white;
}

.final-price-card .result-desc {
  opacity: 0.9;
}

/* 价格构成分析 */
.breakdown-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px 30px;
  margin-top: 30px;
}

.breakdown-section h4 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.breakdown-bar {
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  margin-bottom: 15px;
  background: #e0e6ef;
}

.bar-segment {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  transition: width 0.5s ease;
}

.original-bar {
  background: #3498db;
}

.tax-bar {
  background: #e74c3c;
}

.fee-bar {
  background: #f39c12;
}

.breakdown-legend {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.original-color {
  background: #3498db;
}

.tax-color {
  background: #e74c3c;
}

.fee-color {
  background: #f39c12;
}

/* 占位符区域 */
.placeholder-section {
  text-align: center;
  padding: 60px 40px;
  color: #7f8c8d;
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
}

.placeholder-section h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #2c3e50;
}

.placeholder-section p {
  font-size: 1.1rem;
  margin-bottom: 30px;
}

.examples {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 25px;
  max-width: 500px;
  margin: 0 auto;
  text-align: left;
}

.examples p {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
}

.examples ul {
  list-style-type: none;
}

.examples li {
  padding: 10px 0;
  border-bottom: 1px solid #e0e6ef;
}

.examples li:last-child {
  border-bottom: none;
}

/* 底部样式 */
.footer {
  text-align: center;
  color: #7f8c8d;
  font-size: 0.9rem;
  padding: 20px;
  line-height: 1.8;
}

.disclaimer {
  color: #e74c3c;
  font-weight: 500;
  margin-bottom: 10px;
}

.note {
  margin-bottom: 10px;
  font-style: italic;
}

.timestamp {
  color: #bdc3c7;
}

/* 响应式设计 */
@media (max-width: 768px) {
  #app {
    padding: 15px;
  }
  
  .header {
    padding: 30px 20px;
  }
  
  .header h1 {
    font-size: 2.2rem;
  }
  
  .main-content {
    padding: 25px 20px;
  }
  
  .input-section {
    grid-template-columns: 1fr;
    gap: 25px;
  }
  
  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .result-value {
    font-size: 1.8rem;
  }
  
  .currency-buttons {
    justify-content: center;
  }
  
  .currency-btn {
    min-width: 80px;
    padding: 10px 15px;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.8rem;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .breakdown-legend {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}
</style>