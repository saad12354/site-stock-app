import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { InsulationData } from '@/types/inventory';

interface InsulationSectionProps {
  insulation: InsulationData[];
  onUpdate: (insulation: InsulationData[]) => void;
}

export const InsulationSection: React.FC<InsulationSectionProps> = ({ insulation, onUpdate }) => {
  const updateInsulation = (index: number, updates: Partial<InsulationData>) => {
    const newInsulation = insulation.map((ins, i) => 
      i === index ? { ...ins, ...updates } : ins
    );
    onUpdate(newInsulation);
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          🛡️ Insulation
          <Badge variant="secondary" className="ml-auto">
            {insulation.filter(i => i.selected).length} selected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insulation.map((ins, index) => (
            <div key={ins.size} className="flex items-center gap-4 p-4 rounded-lg border bg-background/50 hover:bg-background/80 transition-colors">
              <Checkbox
                checked={ins.selected}
                onCheckedChange={(checked) => 
                  updateInsulation(index, { selected: !!checked })
                }
                className="scale-125"
              />
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <Label className="font-semibold text-base">{ins.size}"</Label>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Volume (mm)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    value={ins.volume || ''}
                    onChange={(e) => 
                      updateInsulation(index, { volume: Number(e.target.value) || 0 })
                    }
                    placeholder="Vol"
                    className="h-10"
                    disabled={!ins.selected}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Length</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={ins.length || ''}
                    onChange={(e) => 
                      updateInsulation(index, { length: Number(e.target.value) || 0 })
                    }
                    placeholder="Length"
                    className="h-10"
                    disabled={!ins.selected}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Unit</Label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateInsulation(index, { unit: 'ft' })}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        ins.unit === 'ft'
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                      disabled={!ins.selected}
                    >
                      ft
                    </button>
                    <button
                      type="button"
                      onClick={() => updateInsulation(index, { unit: 'm' })}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        ins.unit === 'm'
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                      disabled={!ins.selected}
                    >
                      m
                    </button>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {ins.selected && (ins.volume > 0 || ins.length > 0) && (
                    <span className="text-success font-medium">
                      ✓ {ins.volume}mm, {ins.length}{ins.unit}
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