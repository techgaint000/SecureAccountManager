import React, { useState } from 'react';
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
  MoreVertical 
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
      <div className="text-center py-16">
        <div className="bg-gray-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <User className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">No accounts found</h3>
        <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
          Add your first account to get started with secure credential management. 
          Your data will be encrypted and protected.
        </p>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6">
        {accounts.map((account) => {
          const platform = getPlatformForAccount(account.platform_id);
          const IconComponent = platform ? getIconComponent(platform.icon) : User;
          const isPasswordVisible = visiblePasswords.has(account.id);

          return (
            <Card key={account.id} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-gray-200/50">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {platform && (
                      <div 
                        className="p-3 rounded-xl shadow-sm"
                        style={{ backgroundColor: `${platform.color}15` }}
                      >
                        <IconComponent 
                          className="h-5 w-5" 
                          style={{ color: platform.color }}
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{account.name}</h4>
                      {platform && (
                        <p className="text-sm text-gray-500">{platform.name}</p>
                      )}
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Account
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600"
                        onClick={() => handleDeleteAccount(account.id, account.name)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3">
                  {account.email && (
                    <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg">
                      <div className="flex items-center space-x-3 text-gray-700 min-w-0 flex-1">
                        <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate text-sm">{account.email}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-gray-200"
                        onClick={() => copyToClipboard(account.email, 'Email')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  )}

                  {account.username && (
                    <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg">
                      <div className="flex items-center space-x-3 text-gray-700 min-w-0 flex-1">
                        <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="truncate text-sm">{account.username}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-gray-200"
                        onClick={() => copyToClipboard(account.username, 'Username')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  )}

                  {account.password && (
                    <div className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg">
                      <div className="flex items-center space-x-3 text-gray-700 min-w-0 flex-1">
                        <span className="text-sm">🔒</span>
                        <span className="font-mono text-sm">
                          {isPasswordVisible ? account.password : '••••••••'}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-gray-200"
                          onClick={() => togglePasswordVisibility(account.id)}
                        >
                          {isPasswordVisible ? 
                            <EyeOff className="h-3 w-3" /> : 
                            <Eye className="h-3 w-3" />
                          }
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-gray-200"
                          onClick={() => copyToClipboard(account.password, 'Password')}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {account.notes && (
                    <div className="p-3 bg-blue-50/80 rounded-lg">
                      <div className="flex items-start space-x-3 text-gray-700">
                        <StickyNote className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{account.notes}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Badge variant="outline" className="text-xs bg-gray-50">
                    {new Date(account.created_at).toLocaleDateString()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  // List view
  return (
    <div className="space-y-3">
      {accounts.map((account) => {
        const platform = getPlatformForAccount(account.platform_id);
        const IconComponent = platform ? getIconComponent(platform.icon) : User;
        const isPasswordVisible = visiblePasswords.has(account.id);

        return (
          <Card key={account.id} className="group hover:shadow-md transition-all duration-200 bg-white/90 backdrop-blur-sm border-gray-200/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  {platform && (
                    <div 
                      className="p-2.5 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: `${platform.color}15` }}
                    >
                      <IconComponent 
                        className="h-5 w-5" 
                        style={{ color: platform.color }}
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="font-semibold text-gray-900 truncate">{account.name}</h4>
                      {platform && (
                        <Badge variant="outline" className="text-xs bg-gray-50 border-gray-200">
                          {platform.name}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      {account.email && (
                        <span className="flex items-center space-x-2">
                          <Mail className="h-3 w-3" />
                          <span className="truncate max-w-40">{account.email}</span>
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
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => togglePasswordVisibility(account.id)}
                      >
                        {isPasswordVisible ? 
                          <EyeOff className="h-4 w-4" /> : 
                          <Eye className="h-4 w-4" />
                        }
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => copyToClipboard(account.password, 'Password')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Account
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600"
                        onClick={() => handleDeleteAccount(account.id, account.name)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}