import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PipeData } from '@/types/inventory';

interface PipeSectionProps {
  pipes: PipeData[];
  onUpdate: (pipes: PipeData[]) => void;
}

export const PipeSection: React.FC<PipeSectionProps> = ({ pipes, onUpdate }) => {
  const updatePipe = (index: number, updates: Partial<PipeData>) => {
    const newPipes = pipes.map((pipe, i) => 
      i === index ? { ...pipe, ...updates } : pipe
    );
    onUpdate(newPipes);
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          🔥 Copper Pipes
          <Badge variant="secondary" className="ml-auto">
            {pipes.filter(p => p.selected).length} selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pipes.map((pipe, index) => (
            <div key={pipe.size} className="flex items-center gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors">
              <Checkbox
                checked={pipe.selected}
                onCheckedChange={(checked) => 
                  updatePipe(index, { selected: !!checked })
                }
                className="scale-125"
              />
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                  <Label className="font-semibold text-base">{pipe.size}"</Label>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Quantity</Label>
                  <Input
                    type="number"
                    min="0"
                    value={pipe.quantity || ''}
                    onChange={(e) => 
                      updatePipe(index, { quantity: Number(e.target.value) || 0 })
                    }
                    placeholder="Qty"
                    className="h-10"
                    disabled={!pipe.selected}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Type</Label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updatePipe(index, { type: 'Soft' })}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pipe.type === 'Soft'
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                      disabled={!pipe.selected}
                    >
                      Soft
                    </button>
                    <button
                      type="button"
                      onClick={() => updatePipe(index, { type: 'Hard' })}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pipe.type === 'Hard'
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                      disabled={!pipe.selected}
                    >
                      Hard
                    </button>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {pipe.selected && pipe.quantity > 0 && (
                    <span className="text-success font-medium">
                      ✓ {pipe.quantity} × {pipe.type}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};