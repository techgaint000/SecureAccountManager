import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { usePlatforms } from '@/hooks/usePlatforms';
import { useAccounts } from '@/hooks/useAccounts';
import { PlatformDialog } from './PlatformDialog';
import { AccountDialog } from './AccountDialog';
import { PlatformCard } from './PlatformCard';
import { AccountsList } from './AccountsList';
import { 
  Shield, 
  Plus, 
  Search, 
  LogOut, 
  Settings, 
  Grid3X3,
  List,
  Download,
  Upload,
  Menu,
  X,
  Sparkles,
  TrendingUp
} from 'lucide-react';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const { platforms, loading: platformsLoading } = usePlatforms();
  const { accounts } = useAccounts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [platformDialogOpen, setPlatformDialogOpen] = useState(false);
  const [accountDialogOpen, setAccountDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredPlatforms = platforms.filter(platform =>
    platform.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg border-slate-200/50 dark:border-slate-700/50">
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-2.5 rounded-2xl shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  SecureVault
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Credential Manager</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-9 w-9 ring-2 ring-blue-200 dark:ring-blue-800 shadow-lg">
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold">
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden xl:block">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {user?.email}
                  </span>
                </div>
              </div>
              
              <ThemeToggle />
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all duration-300 hover:scale-105"
              >
                <Settings className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 text-slate-700 dark:text-slate-300 transition-all duration-300 hover:scale-105"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50">
              <div className="px-4 py-4 space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-200 dark:border-slate-700">
                  <Avatar className="h-10 w-10 ring-2 ring-blue-200 dark:ring-blue-800 shadow-lg">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold">
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {user?.email}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Account Settings</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 text-slate-700 dark:text-slate-300 transition-all duration-300"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">Platforms</CardTitle>
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Grid3X3 className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{platforms.length}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                Active platforms
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">Accounts</CardTitle>
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">{accounts.length}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                Secured accounts
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group col-span-2 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">Security Status</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Excellent
                </Badge>
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">98%</div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                All passwords encrypted & secure
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
            <Input
              placeholder="Search platforms and accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-300/50 dark:border-slate-600/50 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 h-11 shadow-lg transition-all duration-300 hover:shadow-xl"
            />
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0">
            <div className="flex items-center space-x-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl p-1 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`h-9 px-4 transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={`h-9 px-4 transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="outline" size="sm" className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-300/50 dark:border-slate-600/50 text-slate-700 dark:text-slate-300 whitespace-nowrap hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 shadow-lg">
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            
            <Button variant="outline" size="sm" className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-300/50 dark:border-slate-600/50 text-slate-700 dark:text-slate-300 whitespace-nowrap hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105 shadow-lg">
              <Upload className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Import</span>
            </Button>
            
            <Button 
              onClick={() => setPlatformDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Platform</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Platforms Section */}
          <div className="xl:col-span-1">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-lg text-slate-900 dark:text-white font-bold">
                  Platforms
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-900/30 dark:to-blue-800/30 dark:text-blue-300 border-0 shadow-sm">
                    {filteredPlatforms.length}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">
                  Manage your connected platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[400px] sm:max-h-[600px] overflow-y-auto">
                {platformsLoading ? (
                  <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
                    <p className="font-medium">Loading platforms...</p>
                  </div>
                ) : filteredPlatforms.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <Shield className="h-10 w-10 text-slate-500 dark:text-slate-400" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 font-semibold text-lg">No platforms yet</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setPlatformDialogOpen(true)}
                      className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-900/30 dark:hover:to-blue-800/30 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Platform
                    </Button>
                  </div>
                ) : (
                  filteredPlatforms.map((platform) => (
                    <PlatformCard
                      key={platform.id}
                      platform={platform}
                      isSelected={selectedPlatform === platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      accountCount={accounts.filter(a => a.platform_id === platform.id).length}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Accounts Section */}
          <div className="xl:col-span-3">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-lg text-slate-900 dark:text-white font-bold">
                  {selectedPlatform 
                    ? `${platforms.find(p => p.id === selectedPlatform)?.name} Accounts`
                    : 'All Accounts'
                  }
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 dark:from-emerald-900/30 dark:to-emerald-800/30 dark:text-emerald-300 border-0 shadow-sm">
                      {selectedPlatform 
                        ? accounts.filter(a => a.platform_id === selectedPlatform).length
                        : filteredAccounts.length
                      }
                    </Badge>
                    <Button 
                      size="sm" 
                      onClick={() => setAccountDialogOpen(true)}
                      disabled={!selectedPlatform && platforms.length === 0}
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Add Account</span>
                      <span className="sm:hidden">Add</span>
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">
                  {selectedPlatform 
                    ? 'Manage accounts for this platform'
                    : 'View and manage all your accounts'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AccountsList
                  accounts={selectedPlatform 
                    ? accounts.filter(a => a.platform_id === selectedPlatform)
                    : filteredAccounts
                  }
                  platforms={platforms}
                  viewMode={viewMode}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <PlatformDialog
        open={platformDialogOpen}
        onOpenChange={setPlatformDialogOpen}
      />
      
      <AccountDialog
        open={accountDialogOpen}
        onOpenChange={setAccountDialogOpen}
        platformId={selectedPlatform}
      />
    </div>
  );
}