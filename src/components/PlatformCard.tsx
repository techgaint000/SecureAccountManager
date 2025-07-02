import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Platform } from '@/lib/supabase';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePlatforms } from '@/hooks/usePlatforms';
import { getIconComponent } from '@/lib/icons';

interface PlatformCardProps {
  platform: Platform;
  isSelected: boolean;
  onClick: () => void;
  accountCount: number;
}

export function PlatformCard({ platform, isSelected, onClick, accountCount }: PlatformCardProps) {
  const { deletePlatform } = usePlatforms();
  const IconComponent = getIconComponent(platform.icon);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete ${platform.name}? This will also delete all associated accounts.`)) {
      await deletePlatform(platform.id);
    }
  };

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-500 hover:shadow-xl transform hover:-translate-y-1 ${
        isSelected 
          ? 'ring-2 ring-blue-500 dark:ring-blue-400 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 shadow-xl border-blue-200 dark:border-blue-700' 
          : 'hover:bg-slate-50/80 dark:hover:bg-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div 
              className={`p-3 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg ${
                isSelected ? 'shadow-xl' : ''
              }`}
              style={{ 
                backgroundColor: `${platform.color}20`,
                boxShadow: `0 8px 32px ${platform.color}15`
              }}
            >
              <IconComponent 
                className="h-5 w-5 transition-transform duration-300" 
                style={{ color: platform.color }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-slate-900 dark:text-white truncate text-sm mb-1">{platform.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {accountCount} {accountCount === 1 ? 'account' : 'accounts'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge 
              variant="secondary" 
              className="text-xs font-bold bg-white/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 shadow-sm"
              style={{ 
                backgroundColor: `${platform.color}10`, 
                color: platform.color,
                borderColor: `${platform.color}30`
              }}
            >
              {accountCount}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-slate-200 dark:hover:bg-slate-600 hover:scale-110"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
                <DropdownMenuItem className="hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Platform
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Platform
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}