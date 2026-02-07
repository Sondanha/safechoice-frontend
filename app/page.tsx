'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, BarChart3, ChevronRight, User, Settings, AlertCircle } from 'lucide-react';

/**
 * Phishing Insight Landing Page
 */
export default function LandingPage() {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState<'USER' | 'ADMIN'>('USER');

  const handleLoginRedirect = () => {
    if (loginType === 'ADMIN') {
      router.push('/admin');
    } else {
      router.push('/simulate');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* GNB (Global Navigation Bar) */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-800">PHISHING INSIGHT</span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">주요 기능</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">서비스 소개</a>
            <a href="#stats" className="hover:text-blue-600 transition-colors">대응 현황</a>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => { setLoginType('USER'); setShowLoginModal(true); }}
              className="text-sm font-bold text-slate-600 px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors"
            >
              사용자
            </button>
            <button
              onClick={() => { setLoginType('ADMIN'); setShowLoginModal(true); }}
              className="bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95"
            >
              관리자 로그인
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-slate-50 rounded-l-[100px] hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex items-center gap-12">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold ring-1 ring-blue-100">
                <span>NEW</span>
                <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                <span>AI 기반 체험형 피싱 대응 진단</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
                "나는 당하지 않는다"는 <br />
                <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">과신을 깨십시오.</span>
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                실제 사건 보고서를 학습한 AI 가해자와의 1:1 시뮬레이션을 통해
                개인의 심리적 취약점을 정밀 진단하고 맞춤형 대응 가이드를 제공합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => router.push('/simulate')}
                  className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center space-x-2 group"
                >
                  <span>지금 바로 진단 시작</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center space-x-4 px-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-500">12,402명이 진단받음</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 mt-16 lg:mt-0 relative">
              <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-400">PHISHING INSIGHT DASHBOARD</span>
                </div>
                <div className="p-8 space-y-6">
                  {/* Mock UI for Radar Chart Representation */}
                  <div className="w-full aspect-square bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-100">
                    <BarChart3 className="w-32 h-32 text-blue-200 animate-pulse" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                      <div className="text-[10px] font-bold text-red-400 uppercase">Detection</div>
                      <div className="text-lg font-black text-red-600">위험 수준: 심각</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <div className="text-[10px] font-bold text-blue-400 uppercase">Speed</div>
                      <div className="text-lg font-black text-blue-600">대응 시간: 1.2s</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Element */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 animate-bounce-short">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400">실시간 탐지</div>
                    <div className="text-sm font-bold text-slate-800">개인정보 유출 시도 감지됨</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">강력한 3단계 정밀 진단 시스템</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">공공기관과 금융권에서 활용하는 최신 피싱 수법을 모두 탑재한 국내 유일의 체험형 교육 플랫폼입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Settings className="w-6 h-6" />, title: "사건 기반 시나리오", desc: "실제 범죄 사례 PDF를 AI가 실시간 분석하여 가해자 페르소나를 구축합니다." },
              { icon: <Shield className="w-6 h-6" />, title: "실시간 PII 탐지", desc: "사용자가 주소, 계좌번호 등 민감 정보를 입력하는 즉시 감지하여 경고합니다." },
              { icon: <BarChart3 className="w-6 h-6" />, title: "행동 분석 리포트", desc: "대화 패턴을 분석하여 권위 복종, 심리 압박 등 5대 지표별 취약점을 진단합니다." }
            ].map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center">
              <Shield className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-sm font-black text-slate-400">PHISHING INSIGHT</span>
          </div>
          <div className="text-xs text-slate-400">© 2026 Phishing Insight. All rights reserved. 대한민국 미래보안 연구소.</div>
          <div className="flex space-x-6 text-xs font-bold text-slate-400">
            <a href="#" className="hover:text-blue-600">이용약관</a>
            <a href="#" className="hover:text-blue-600">개인정보처리방침</a>
            <a href="#" className="hover:text-blue-600">고객센터</a>
          </div>
        </div>
      </footer>

      {/* Login Modal Mockup */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}></div>
          <div className="bg-white w-full max-w-md rounded-[32px] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className={`h-2 w-full ${loginType === 'ADMIN' ? 'bg-blue-600' : 'bg-slate-900'}`}></div>
            <div className="p-10 space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-slate-900">
                  {loginType === 'ADMIN' ? '관리자 대시보드' : '사용자 시뮬레이션'}
                </h3>
                <p className="text-sm text-slate-500">계정에 접속하여 서비스를 이용하세요.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Account ID</label>
                  <input
                    type="text"
                    placeholder="아이디를 입력하세요"
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Password</label>
                  <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleLoginRedirect}
                className={`w-full py-5 rounded-2xl font-bold text-white shadow-xl transition-all active:scale-[0.98] ${loginType === 'ADMIN' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 'bg-slate-900 hover:bg-black shadow-slate-200'
                  }`}
              >
                접속하기
              </button>

              <div className="text-center">
                <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">계정 정보를 잊으셨나요?</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
