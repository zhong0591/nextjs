'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Welcome() {
  const router = useRouter()
  const [username, setUsername] = useState('')

  useEffect(() => {
    // 在实际应用中，这里可以从本地存储或状态管理中获取用户名
    // 暂时使用固定值或者从 URL 参数获取
    const urlParams = new URLSearchParams(window.location.search)
    const user = urlParams.get('user') || 'admin'
    setUsername(user)
  }, [])

  const handleLogout = () => {
    // 清除登录状态并跳转到登录页
    router.push('/')
  }

  const handleGoBack = () => {
    // 返回登录页
    router.push('/')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              欢迎！
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              您好，<span className="font-semibold text-indigo-600">{username}</span>！
            </p>
            
            <p className="text-gray-600 mb-8">
              您已成功登录到系统中。
            </p>

            <div className="space-y-4">
              <button
                onClick={handleLogout}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                重新登录
              </button>
              
              <button
                onClick={handleGoBack}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                返回登录页
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                这是一个演示页面，展示了登录成功后的欢迎界面。
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}