import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  Shield, 
  Lock, 
  Zap, 
  Eye, 
  Smartphone, 
  Globe, 
  CheckCircle, 
  Star,
  ArrowRight,
  Play,
  Users,
  Award,
  Sparkles,
  ChevronDown,
  Mail,
  User,
  Copy,
  EyeOff,
  MoreVertical,
  Grid3X3,
  TrendingUp,
  Search,
  Plus
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your credentials are encrypted with military-grade security and protected by advanced RLS policies."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Access your accounts instantly with our optimized dashboard and quick search functionality."
    },
    {
      icon: Smartphone,
      title: "Cross-Platform",
      description: "Seamlessly sync across all your devices with responsive design that works everywhere."
    },
    {
      icon: Eye,
      title: "Privacy First",
      description: "Your data stays yours. We use zero-knowledge architecture to ensure complete privacy."
    },
    {
      icon: Lock,
      title: "Auto-Logout",
      description: "Automatic session management with 5-minute inactivity logout for enhanced security."
    },
    {
      icon: Globe,
      title: "Universal Support",
      description: "Manage credentials for any platform - from social media to banking and everything in between."
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "256-bit", label: "Encryption" },
    { number: "10K+", label: "Users Trust Us" },
    { number: "0", label: "Data Breaches" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "SecureVault has completely transformed how I manage my digital life. The security features give me peace of mind.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Software Engineer",
      content: "The best credential manager I've used. Clean interface, robust security, and works flawlessly across all my devices.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Digital Marketer",
      content: "Managing multiple client accounts has never been easier. The platform organization feature is a game-changer.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  SecureVault
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Credential Manager</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
              <a href="#security" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Security</a>
              <a href="#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Reviews</a>
              <ThemeToggle />
              <Button variant="outline" onClick={onGetStarted} className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Sign In</Button>
              <Button onClick={onGetStarted} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button onClick={onGetStarted} size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full max-w-none mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="secondary" className="mb-4 sm:mb-6 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50">
              <Sparkles className="h-3 w-3 mr-1" />
              Trusted by 10,000+ users worldwide
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white leading-tight">
              Your Digital Life,
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Perfectly Secured
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Store, organize, and access all your credentials with military-grade security. 
              Experience the future of password management with our beautiful, intuitive platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
              <Button 
                onClick={onGetStarted}
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Free Today
                <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <Play className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm text-gray-600 dark:text-gray-400 px-4">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                Free forever plan
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                Setup in 2 minutes
              </div>
            </div>
          </div>

          {/* Interactive Dashboard Preview */}
          <div className="relative max-w-6xl mx-auto px-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 overflow-hidden">
              
              {/* Mock Dashboard Header */}
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-4 mb-4 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm">SecureVault</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Credential Manager</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">U</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mock Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Platforms</span>
                    <Grid3X3 className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="text-lg font-bold text-blue-600">5</div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Accounts</span>
                    <Shield className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="text-lg font-bold text-green-600">12</div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200/50 dark:border-gray-700/50 col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Security</span>
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                  </div>
                  <div className="text-lg font-bold text-emerald-600">98%</div>
                </div>
              </div>

              {/* Mock Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl pl-10 pr-4 py-3 border border-gray-200/50 dark:border-gray-700/50 text-sm text-gray-600 dark:text-gray-400">
                  Search platforms and accounts...
                </div>
                <Button size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>

              {/* Mock Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Platforms Column */}
                <div className="lg:col-span-1">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Platforms</h4>
                    <div className="space-y-2">
                      {[
                        { name: 'Gmail', color: '#ea4335', accounts: 3 },
                        { name: 'GitHub', color: '#333333', accounts: 2 },
                        { name: 'LinkedIn', color: '#0077b5', accounts: 1 }
                      ].map((platform, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50/80 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-600/50 transition-colors cursor-pointer">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${platform.color}20` }}
                            >
                              <Mail className="h-3 w-3" style={{ color: platform.color }} />
                            </div>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">{platform.name}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">{platform.accounts}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Accounts Column */}
                <div className="lg:col-span-3">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Gmail Accounts</h4>
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-xs">
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { name: 'Personal Gmail', email: 'john@gmail.com', username: 'john.doe' },
                        { name: 'Work Gmail', email: 'john@company.com', username: 'j.doe' }
                      ].map((account, index) => (
                        <div key={index} className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 dark:from-gray-700/50 dark:to-blue-900/20 rounded-xl p-4 border border-gray-200/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-lg">
                                <Mail className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <h5 className="font-semibold text-gray-900 dark:text-white text-sm">{account.name}</h5>
                                <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                                  <span className="flex items-center space-x-1">
                                    <Mail className="h-3 w-3" />
                                    <span>{account.email}</span>
                                  </span>
                                  <span className="flex items-center space-x-1">
                                    <User className="h-3 w-3" />
                                    <span>{account.username}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <EyeOff className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Elements */}
              <div className="absolute top-4 right-4 opacity-30">
                <div className="animate-pulse">
                  <div className="w-2 h-2 bg-green-500 rounded-full mb-1"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full mb-1"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-12 sm:mt-16">
          <ChevronDown className="h-6 w-6 text-gray-500 dark:text-gray-400 mx-auto animate-bounce" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm w-full">
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full max-w-none mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="secondary" className="mb-4 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
              Features
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
              Everything you need for
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                secure credential management
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to keep your digital life organized and secure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full">
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                Security First
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
                Your data is protected by
                <br />
                <span className="text-blue-200">military-grade encryption</span>
              </h2>
              <p className="text-base sm:text-lg text-blue-100 mb-6 sm:mb-8 leading-relaxed">
                We use the same security standards as banks and government institutions. 
                Your credentials are encrypted before they even leave your device.
              </p>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                  <span className="text-sm sm:text-base">256-bit AES encryption</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Zero-knowledge architecture</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Row-level security policies</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Automatic session management</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-white/10 rounded-xl">
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 text-green-300 mr-3" />
                      <span className="font-medium text-sm sm:text-base">Encryption Status</span>
                    </div>
                    <Badge className="bg-green-500 text-white text-xs sm:text-sm">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-white/10 rounded-xl">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-blue-300 mr-3" />
                      <span className="font-medium text-sm sm:text-base">Security Level</span>
                    </div>
                    <Badge className="bg-blue-500 text-white text-xs sm:text-sm">Maximum</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-white/10 rounded-xl">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-purple-300 mr-3" />
                      <span className="font-medium text-sm sm:text-base">Access Control</span>
                    </div>
                    <Badge className="bg-purple-500 text-white text-xs sm:text-sm">Private</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm w-full">
        <div className="w-full max-w-none mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="secondary" className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
              Testimonials
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
              Loved by users
              <br />
              <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                around the world
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-gray-800 dark:text-gray-200 leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
            Ready to secure your
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              digital life?
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust SecureVault with their most important credentials. 
            Start your free account today.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
            </Button>
          </div>

          <div className="mt-6 sm:mt-8 text-sm text-gray-400">
            No credit card required • Free forever plan • Setup in 2 minutes
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full max-w-none mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SecureVault</h3>
                  <p className="text-sm text-gray-400">Credential Manager</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The most secure and user-friendly way to manage your digital credentials. 
                Trusted by thousands of users worldwide.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Award className="h-4 w-4" />
                <span>SOC 2 Type II Certified</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
            <p>&copy; 2025 SecureVault. All rights reserved. Built with security and privacy in mind.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}