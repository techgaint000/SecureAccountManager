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
      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
        isSelected 
          ? 'ring-2 ring-blue-500 dark:ring-blue-400 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 shadow-lg' 
          : 'hover:bg-gray-50/80 dark:hover:bg-gray-700/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div 
              className={`p-2.5 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                isSelected ? 'shadow-md' : ''
              }`}
              style={{ backgroundColor: `${platform.color}20` }}
            >
              <IconComponent 
                className="h-5 w-5" 
                style={{ color: platform.color }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm">{platform.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {accountCount} {accountCount === 1 ? 'account' : 'accounts'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge 
              variant="secondary" 
              className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              style={{ 
                backgroundColor: `${platform.color}15`, 
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
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Platform
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
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