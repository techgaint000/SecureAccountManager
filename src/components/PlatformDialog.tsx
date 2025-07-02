import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePlatforms } from '@/hooks/usePlatforms';
import { useToast } from '@/hooks/use-toast';
import { getIconComponent, platformPresets } from '@/lib/icons';

interface PlatformDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlatformDialog({ open, onOpenChange }: PlatformDialogProps) {
  const [name, setName] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [customIcon, setCustomIcon] = useState('globe');
  const [customColor, setCustomColor] = useState('#3b82f6');
  const [loading, setLoading] = useState(false);
  
  const { createPlatform } = usePlatforms();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const preset = platformPresets.find(p => p.name === selectedPreset);
      const icon = preset?.icon || customIcon;
      const color = preset?.color || customColor;

      const { error } = await createPlatform({
        name: name.trim(),
        icon,
        color,
      });

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to create platform',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: `${name} platform created successfully`,
        });
        resetForm();
        onOpenChange(false);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setSelectedPreset('');
    setCustomIcon('globe');
    setCustomColor('#3b82f6');
  };

  const handlePresetChange = (presetName: string) => {
    setSelectedPreset(presetName);
    if (presetName && !name) {
      setName(presetName);
    }
  };

  const currentIcon = selectedPreset 
    ? platformPresets.find(p => p.name === selectedPreset)?.icon || 'globe'
    : customIcon;
  
  const currentColor = selectedPreset
    ? platformPresets.find(p => p.name === selectedPreset)?.color || '#3b82f6'
    : customColor;

  const IconComponent = getIconComponent(currentIcon);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Platform</DialogTitle>
          <DialogDescription>
            Create a new platform to organize your accounts
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="preset">Choose a preset (optional)</Label>
            <Select value={selectedPreset} onValueChange={handlePresetChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a popular platform..." />
              </SelectTrigger>
              <SelectContent>
                {platformPresets.map((preset) => {
                  const PresetIcon = getIconComponent(preset.icon);
                  return (
                    <SelectItem key={preset.name} value={preset.name}>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="p-1 rounded"
                          style={{ backgroundColor: `${preset.color}20` }}
                        >
                          <PresetIcon 
                            className="h-4 w-4" 
                            style={{ color: preset.color }}
                          />
                        </div>
                        <span>{preset.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Platform Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Gmail, Instagram, Custom Service"
              required
            />
          </div>

          {!selectedPreset && (
            <>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={customIcon} onValueChange={setCustomIcon}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['globe', 'mail', 'shield', 'user', 'key', 'lock', 'server'].map((icon) => {
                      const Icon = getIconComponent(icon);
                      return (
                        <SelectItem key={icon} value={icon}>
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <span className="capitalize">{icon}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="color"
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    placeholder="#3b82f6"
                    className="flex-1"
                  />
                </div>
              </div>
            </>
          )}

          {/* Preview */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <Label className="text-sm text-gray-600 mb-2 block">Preview</Label>
            <div className="flex items-center space-x-3">
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: `${currentColor}20` }}
              >
                <IconComponent 
                  className="h-6 w-6" 
                  style={{ color: currentColor }}
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {name || 'Platform Name'}
                </h3>
                <p className="text-sm text-gray-500">0 accounts</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !name.trim()}>
              {loading ? 'Creating...' : 'Create Platform'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}