import React, { useState } from 'react';
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
  X
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
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm border-gray-200 dark:border-gray-700">
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  SecureVault
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Credential Manager</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 ring-2 ring-blue-200 dark:ring-blue-800">
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold">
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden xl:block">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {user?.email}
                  </span>
                </div>
              </div>
              
              <ThemeToggle />
              
              <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                <Settings className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 text-gray-700 dark:text-gray-300"
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
                className="text-gray-700 dark:text-gray-300"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <div className="px-4 py-4 space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                  <Avatar className="h-10 w-10 ring-2 ring-blue-200 dark:ring-blue-800">
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.email}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Account Settings</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 text-gray-700 dark:text-gray-300"
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

      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Platforms</CardTitle>
              <Grid3X3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{platforms.length}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Active platforms
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Accounts</CardTitle>
              <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{accounts.length}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Secured accounts
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow col-span-2 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Security Status</CardTitle>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800">
                Excellent
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-green-700 dark:text-green-400">98%</div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                All passwords encrypted & secure
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Search platforms and accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 h-10 sm:h-11"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            <div className="flex items-center space-x-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-1 border border-gray-200 dark:border-gray-700">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 px-3"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 px-3"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="outline" size="sm" className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 whitespace-nowrap">
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            
            <Button variant="outline" size="sm" className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 whitespace-nowrap">
              <Upload className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Import</span>
            </Button>
            
            <Button 
              onClick={() => setPlatformDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 whitespace-nowrap"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add Platform</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
          {/* Platforms Section */}
          <div className="xl:col-span-1">
            <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-base sm:text-lg text-gray-900 dark:text-white">
                  Platforms
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {filteredPlatforms.length}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Manage your connected platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[400px] sm:max-h-[600px] overflow-y-auto">
                {platformsLoading ? (
                  <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
                    Loading platforms...
                  </div>
                ) : filteredPlatforms.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Shield className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 font-medium">No platforms yet</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setPlatformDialogOpen(true)}
                      className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
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
            <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-base sm:text-lg text-gray-900 dark:text-white">
                  {selectedPlatform 
                    ? `${platforms.find(p => p.id === selectedPlatform)?.name} Accounts`
                    : 'All Accounts'
                  }
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      {selectedPlatform 
                        ? accounts.filter(a => a.platform_id === selectedPlatform).length
                        : filteredAccounts.length
                      }
                    </Badge>
                    <Button 
                      size="sm" 
                      onClick={() => setAccountDialogOpen(true)}
                      disabled={!selectedPlatform && platforms.length === 0}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Add Account</span>
                      <span className="sm:hidden">Add</span>
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
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