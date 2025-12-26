'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

// 产品数据类型
interface Product {
  id: number
  name: string
  price: number
  description: string
  category: string
  image: string
  stock: number
}

// 产品数据
const products: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro',
    price: 19999,
    description: '配备M3芯片的专业级笔记本电脑',
    category: '笔记本电脑',
    image: '💻',
    stock: 15
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    price: 8999,
    description: '最新款的智能手机，配备钛金属设计',
    category: '智能手机',
    image: '📱',
    stock: 32
  },
  {
    id: 3,
    name: 'iPad Air',
    price: 4999,
    description: '轻薄强大的平板电脑，适合工作和创作',
    category: '平板电脑',
    image: '📱',
    stock: 28
  },
  {
    id: 4,
    name: 'AirPods Pro',
    price: 1899,
    description: '主动降噪无线耳机',
    category: '音频设备',
    image: '🎧',
    stock: 45
  },
  {
    id: 5,
    name: 'Apple Watch',
    price: 2999,
    description: '智能手表，健康监测专家',
    category: '可穿戴设备',
    image: '⌚',
    stock: 20
  },
  {
    id: 6,
    name: 'iMac 24英寸',
    price: 12999,
    description: '一体化台式机，配备M3芯片',
    category: '台式机',
    image: '🖥️',
    stock: 12
  }
]

export default function Products() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')
  const [searchTerm, setSearchTerm] = useState('')

  // 获取所有分类
  const categories = ['全部', ...Array.from(new Set(products.map(product => product.category)))]

  // 过滤产品
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === '全部' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleLogout = () => {
    router.push('/')
  }

  const handleProductClick = (product: Product) => {
    alert(`产品详情：\n名称：${product.name}\n价格：￥${product.price}\n库存：${product.stock}件`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">产品展示</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                返回登录
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 搜索和筛选 */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="搜索产品..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 产品统计 */}
        <div className="mb-6">
          <p className="text-gray-600">
            共找到 <span className="font-semibold text-indigo-600">{filteredProducts.length}</span> 个产品
            {selectedCategory !== '全部' && (
              <span> · 分类：{selectedCategory}</span>
            )}
          </p>
        </div>

        {/* 产品列表 */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到产品</h3>
            <p className="text-gray-600">请尝试调整搜索条件或筛选条件</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">{product.image}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-indigo-600">
                        ￥{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        库存：{product.stock}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {product.category}
                    </span>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm">
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 底部信息 */}
        <div className="mt-12 text-center text-gray-500">
          <p className="text-sm">
            这是一个演示产品列表页面，点击产品可以查看详细信息
          </p>
        </div>
      </div>
    </div>
  )
}