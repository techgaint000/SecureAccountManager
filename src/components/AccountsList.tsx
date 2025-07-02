import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Account, type Platform } from '@/lib/supabase';
import { 
  Eye, 
  EyeOff, 
  Copy, 
  Edit, 
  Trash2, 
  Mail, 
  User, 
  StickyNote,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  Calendar,
  Shield
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAccounts } from '@/hooks/useAccounts';
import { useToast } from '@/hooks/use-toast';
import { getIconComponent } from '@/lib/icons';

interface AccountsListProps {
  accounts: Account[];
  platforms: Platform[];
  viewMode: 'grid' | 'list';
}

export function AccountsList({ accounts, platforms, viewMode }: AccountsListProps) {
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(new Set());
  const { deleteAccount } = useAccounts();
  const { toast } = useToast();

  const togglePasswordVisibility = (accountId: string) => {
    const newVisible = new Set(visiblePasswords);
    if (newVisible.has(accountId)) {
      newVisible.delete(accountId);
    } else {
      newVisible.add(accountId);
    }
    setVisiblePasswords(newVisible);
  };

  const toggleAccountExpansion = (accountId: string) => {
    const newExpanded = new Set(expandedAccounts);
    if (newExpanded.has(accountId)) {
      newExpanded.delete(accountId);
    } else {
      newExpanded.add(accountId);
    }
    setExpandedAccounts(newExpanded);
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: `${type} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAccount = async (accountId: string, accountName: string) => {
    if (confirm(`Are you sure you want to delete the account "${accountName}"?`)) {
      await deleteAccount(accountId);
      toast({
        title: 'Account deleted',
        description: `${accountName} has been removed`,
      });
    }
  };

  const getPlatformForAccount = (platformId: string) => {
    return platforms.find(p => p.id === platformId);
  };

  if (accounts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-full p-8 w-24 h-24 mx-auto mb-8 flex items-center justify-center shadow-lg">
          <User className="h-12 w-12 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">No accounts found</h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed text-lg">
          Add your first account to get started with secure credential management. 
          Your data will be encrypted and protected.
        </p>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {accounts.map((account) => {
          const platform = getPlatformForAccount(account.platform_id);
          const IconComponent = platform ? getIconComponent(platform.icon) : User;
          const isPasswordVisible = visiblePasswords.has(account.id);
          const isExpanded = expandedAccounts.has(account.id);

          return (
            <Card key={account.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 overflow-hidden">
              <CardContent className="p-0">
                {/* Header - Always Visible */}
                <div 
                  className="p-6 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-all duration-300"
                  onClick={() => toggleAccountExpansion(account.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      {platform && (
                        <div 
                          className="p-4 rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                          style={{ 
                            backgroundColor: `${platform.color}15`,
                            boxShadow: `0 8px 32px ${platform.color}20`
                          }}
                        >
                          <IconComponent 
                            className="h-6 w-6" 
                            style={{ color: platform.color }}
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-xl mb-1">{account.name}</h4>
                        {platform && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{platform.name}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300"
                      >
                        {isExpanded ? 
                          <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-400" /> : 
                          <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        }
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-200 dark:hover:bg-slate-600">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
                          <DropdownMenuItem className="hover:bg-blue-50 dark:hover:bg-blue-900/30">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Account
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAccount(account.id, account.name);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Quick Preview */}
                  <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                    {account.email && (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3" />
                        <span className="truncate max-w-32">{account.email}</span>
                      </div>
                    )}
                    {account.username && (
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3" />
                        <span className="truncate max-w-24">{account.username}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 space-y-4 border-t border-slate-100 dark:border-slate-700 pt-4">
                    {account.email && (
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                        <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 min-w-0 flex-1">
                          <Mail className="h-4 w-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                          <span className="truncate text-sm font-medium">{account.email}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(account.email, 'Email');
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    )}

                    {account.username && (
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                        <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 min-w-0 flex-1">
                          <User className="h-4 w-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                          <span className="truncate text-sm font-medium">{account.username}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(account.username, 'Username');
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    )}

                    {account.password && (
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-100 dark:border-amber-800/30">
                        <div className="flex items-center space-x-3 text-slate-700 dark:text-slate-300 min-w-0 flex-1">
                          <Shield className="h-4 w-4 text-amber-500 dark:text-amber-400 flex-shrink-0" />
                          <span className="font-mono text-sm">
                            {isPasswordVisible ? account.password : '••••••••••••'}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePasswordVisibility(account.id);
                            }}
                          >
                            {isPasswordVisible ? 
                              <EyeOff className="h-3 w-3" /> : 
                              <Eye className="h-3 w-3" />
                            }
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(account.password, 'Password');
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {account.notes && (
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30">
                        <div className="flex items-start space-x-3 text-slate-700 dark:text-slate-300">
                          <StickyNote className="h-4 w-4 text-purple-500 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{account.notes}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
                      <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(account.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  // List view with enhanced styling
  return (
    <div className="space-y-4">
      {accounts.map((account) => {
        const platform = getPlatformForAccount(account.platform_id);
        const IconComponent = platform ? getIconComponent(platform.icon) : User;
        const isPasswordVisible = visiblePasswords.has(account.id);
        const isExpanded = expandedAccounts.has(account.id);

        return (
          <Card key={account.id} className="group hover:shadow-xl transition-all duration-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 overflow-hidden">
            <CardContent className="p-0">
              {/* Header */}
              <div 
                className="p-5 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-all duration-300"
                onClick={() => toggleAccountExpansion(account.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    {platform && (
                      <div 
                        className="p-3 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ 
                          backgroundColor: `${platform.color}15`,
                          boxShadow: `0 4px 16px ${platform.color}20`
                        }}
                      >
                        <IconComponent 
                          className="h-5 w-5" 
                          style={{ color: platform.color }}
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="font-bold text-slate-900 dark:text-white truncate text-lg">{account.name}</h4>
                        {platform && (
                          <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400">
                            {platform.name}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
                        {account.email && (
                          <span className="flex items-center space-x-2">
                            <Mail className="h-3 w-3" />
                            <span className="truncate max-w-48">{account.email}</span>
                          </span>
                        )}
                        {account.username && (
                          <span className="flex items-center space-x-2">
                            <User className="h-3 w-3" />
                            <span className="truncate max-w-32">{account.username}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {account.password && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePasswordVisibility(account.id);
                          }}
                        >
                          {isPasswordVisible ? 
                            <EyeOff className="h-4 w-4" /> : 
                            <Eye className="h-4 w-4" />
                          }
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(account.password, 'Password');
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300"
                    >
                      {isExpanded ? 
                        <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-400" /> : 
                        <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      }
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-200 dark:hover:bg-slate-600">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
                        <DropdownMenuItem className="hover:bg-blue-50 dark:hover:bg-blue-900/30">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Account
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAccount(account.id, account.name);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-700 pt-4">
                  {account.notes && (
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30 mb-4">
                      <div className="flex items-start space-x-3 text-slate-700 dark:text-slate-300">
                        <StickyNote className="h-4 w-4 text-purple-500 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{account.notes}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      Created {new Date(account.created_at).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}