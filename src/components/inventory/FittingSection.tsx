import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FittingData } from '@/types/inventory';

interface FittingSectionProps {
  fittings: FittingData[];
  onUpdate: (fittings: FittingData[]) => void;
}

export const FittingSection: React.FC<FittingSectionProps> = ({ fittings, onUpdate }) => {
  const updateFitting = (index: number, updates: Partial<FittingData>) => {
    const newFittings = fittings.map((fitting, i) => 
      i === index ? { ...fitting, ...updates } : fitting
    );
    onUpdate(newFittings);
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          🔧 Pipe Fittings
          <Badge variant="secondary" className="ml-auto">
            {fittings.filter(f => f.selected).length} selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fittings.map((fitting, index) => (
            <div key={fitting.size} className="flex items-center gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors">
              <Checkbox
                checked={fitting.selected}
                onCheckedChange={(checked) => 
                  updateFitting(index, { selected: !!checked })
                }
                className="scale-125"
              />
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                  <Label className="font-semibold text-base">{fitting.size}"</Label>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Elbow Qty</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={fitting.elbowQty || ''}
                    onChange={(e) => 
                      updateFitting(index, { elbowQty: Number(e.target.value) || 0 })
                    }
                    placeholder="Qty"
                    className="h-10"
                    disabled={!fitting.selected}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Coupling Qty</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={fitting.couplingQty || ''}
                    onChange={(e) => 
                      updateFitting(index, { couplingQty: Number(e.target.value) || 0 })
                    }
                    placeholder="Qty"
                    className="h-10"
                    disabled={!fitting.selected}
                  />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {fitting.selected && (fitting.elbowQty > 0 || fitting.couplingQty > 0) && (
                    <span className="text-success font-medium">
                      ✓ E:{fitting.elbowQty} C:{fitting.couplingQty}
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