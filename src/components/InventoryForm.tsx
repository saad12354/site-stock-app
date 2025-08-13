import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  InventoryFormData, 
  PipeData, 
  InsulationData, 
  FittingData, 
  NutData, 
  WireData,
  PIPE_SIZES,
  FITTING_SIZES,
  NUT_SIZES,
  WIRE_SIZES
} from '@/types/inventory';
import { PipeSection } from './inventory/PipeSection';
import { InsulationSection } from './inventory/InsulationSection';
import { FittingSection } from './inventory/FittingSection';
import { NutSection } from './inventory/NutSection';
import { WireSection } from './inventory/WireSection';
import { SimpleSection } from './inventory/SimpleSection';
import { SearchAndFilter, FilterCategory } from './SearchAndFilter';
import { Clipboard, Package, Share2 } from 'lucide-react';

export const InventoryForm = () => {
  const { toast } = useToast();
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<FilterCategory[]>([]);
  const [showOnlySelected, setShowOnlySelected] = useState(false);
  
  const [formData, setFormData] = useState<InventoryFormData>({
    siteName: '',
    pipes: PIPE_SIZES.map(size => ({ size, quantity: 0, type: 'Soft', selected: false })),
    insulation: PIPE_SIZES.map(size => ({ size, volume: 0, length: 0, unit: 'ft', selected: false })),
    fittings: FITTING_SIZES.map(size => ({ size, elbowQty: 0, couplingQty: 0, selected: false })),
    nuts: NUT_SIZES.map(size => ({ size, quantity: 0, selected: false })),
    flaringTool: false,
    brazingRods: 0,
    butaneSize: '',
    butaneQty: 0,
    drainHeaterLength: 0,
    hatlonLength: 0,
    hatlonUnit: '',
    monsoonTapeLength: 0,
    monsoonTapeQty: 0,
    wireTapeLength: 0,
    wireTapeQty: 0,
    cableTies: 0,
    cableTray: 0,
    casingPatti: 0,
    clamPatti: 0,
    wires: WIRE_SIZES.map(size => ({ size, length: 0, cores: 2, selected: false })),
    oxygenCylinders: 0,
    nitrogenCylinders: 0,
    acGas: ''
  });

  // Filter logic
  const shouldShowSection = (category: FilterCategory) => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.includes(category);
  };

  const matchesSearch = (text: string) => {
    if (!searchTerm) return true;
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // Calculate item counts for each category
  const itemCounts = useMemo((): Record<FilterCategory, number> => {
    const counts: Record<FilterCategory, number> = {
      pipes: 0,
      insulation: 0, 
      fittings: 0,
      nuts: 0,
      wires: 0,
      tools: 0,
      materials: 0
    };

    // Count pipes
    counts.pipes = formData.pipes.filter(pipe => 
      !showOnlySelected || (pipe.selected && pipe.quantity > 0)
    ).length;

    // Count insulation
    counts.insulation = formData.insulation.filter(ins => 
      !showOnlySelected || (ins.selected && (ins.volume > 0 || ins.length > 0))
    ).length;

    // Count fittings
    counts.fittings = formData.fittings.filter(fit => 
      !showOnlySelected || (fit.selected && (fit.elbowQty > 0 || fit.couplingQty > 0))
    ).length;

    // Count nuts
    counts.nuts = formData.nuts.filter(nut => 
      !showOnlySelected || (nut.selected && nut.quantity > 0)
    ).length;

    // Count wires
    counts.wires = formData.wires.filter(wire => 
      !showOnlySelected || (wire.selected && wire.length > 0)
    ).length;

    // Count tools - flaring tool
    counts.tools = formData.flaringTool ? 1 : 0;

    // Count materials - all other items
    let materialsCount = 0;
    if (formData.brazingRods > 0) materialsCount++;
    if (formData.butaneQty > 0) materialsCount++;
    if (formData.drainHeaterLength > 0) materialsCount++;
    if (formData.hatlonLength > 0) materialsCount++;
    if (formData.oxygenCylinders > 0) materialsCount++;
    if (formData.nitrogenCylinders > 0) materialsCount++;
    if (formData.acGas) materialsCount++;
    counts.materials = materialsCount;

    return counts;
  }, [formData, showOnlySelected]);

  const generateOutput = () => {
    const out: string[] = [];
    
    if (formData.siteName) {
      out.unshift(`Project: ${formData.siteName}\n`);
    }

    // Flaring Tool
    if (formData.flaringTool) {
      out.push('🔧 Flaring Tool: ✓ Required');
    }

    // Copper pipes
    const pipeOutputs = formData.pipes
      .filter(pipe => pipe.selected && pipe.quantity > 0)
      .map(pipe => `${pipe.size}" ${pipe.type} ×${pipe.quantity}`);
    
    if (pipeOutputs.length) {
      out.push(`🔥 Copper Pipes: ${pipeOutputs.join(', ')}`);
    }

    // Insulation
    const insulationOutputs = formData.insulation
      .filter(ins => ins.selected && (ins.volume > 0 || ins.length > 0))
      .map(ins => `${ins.size}" (Vol:${ins.volume}mm) ${ins.length}${ins.unit}`);
    
    if (insulationOutputs.length) {
      out.push(`🛡️ Insulation: ${insulationOutputs.join(', ')}`);
    }

    // Pipe Fittings
    const fittingOutputs = formData.fittings
      .filter(fit => fit.selected)
      .map(fit => {
        const fittings = [];
        if (fit.elbowQty > 0) fittings.push(`Elbow ×${fit.elbowQty}`);
        if (fit.couplingQty > 0) fittings.push(`Coupling ×${fit.couplingQty}`);
        return fittings.length > 0 ? `${fit.size}" ${fittings.join(', ')}` : '';
      })
      .filter(Boolean);
    
    if (fittingOutputs.length) {
      out.push(`🔧 Pipe Fittings: ${fittingOutputs.join(' | ')}`);
    }

    // Flare Nuts
    const nutOutputs = formData.nuts
      .filter(nut => nut.selected && nut.quantity > 0)
      .map(nut => `${nut.size}" ×${nut.quantity}`);
    
    if (nutOutputs.length) {
      out.push(`🔩 Flare Nuts: ${nutOutputs.join(', ')}`);
    }

    // Simple sections
    if (formData.brazingRods > 0) {
      out.push(`🔥 Brazing Rods: ×${formData.brazingRods} pieces`);
    }

    if (formData.butaneSize && formData.butaneQty > 0) {
      out.push(`⛽ Butane / LPG: ${formData.butaneSize} cylinder ×${formData.butaneQty}`);
    }

    if (formData.drainHeaterLength > 0) {
      out.push(`🔌 Drain Heater: ${formData.drainHeaterLength} ft`);
    }

    if (formData.hatlonLength > 0 && formData.hatlonUnit) {
      out.push(`📏 Hatlon: ${formData.hatlonLength} ${formData.hatlonUnit}`);
    }

    // Wires
    const wireOutputs = formData.wires
      .filter(wire => wire.selected && wire.length > 0)
      .map(wire => `${wire.size}sq mm ${wire.cores}-core ${wire.length}m`);
    
    if (wireOutputs.length) {
      out.push(`⚡ Wires: ${wireOutputs.join(', ')}`);
    }

    if (formData.oxygenCylinders > 0) {
      out.push(`🫧 Oxygen Cylinders: ×${formData.oxygenCylinders} cylinders`);
    }

    if (formData.nitrogenCylinders > 0) {
      out.push(`💨 Nitrogen Cylinders: ×${formData.nitrogenCylinders} cylinders`);
    }

    if (formData.acGas) {
      out.push(`❄️ AC Gas: ${formData.acGas} type/kg`);
    }

    const message = '📋 INVENTORY SUMMARY\n' + '═'.repeat(30) + '\n\n' + out.join('\n\n') + '\n\n' + '═'.repeat(30);
    
    return message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const output = generateOutput();
    
    // Open in new window
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(`
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <title>Inventory Summary</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                padding: 20px;
                font-size: 16px;
                background: #f8fafc;
                color: #1e293b;
                line-height: 1.6;
              }
              .container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                padding: 30px;
                border-radius: 12px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              }
              pre {
                background: #f1f5f9;
                padding: 20px;
                border-radius: 8px;
                line-height: 1.8;
                white-space: pre-wrap;
                border-left: 4px solid #3b82f6;
                font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;
              }
              .button-group {
                display: flex;
                gap: 12px;
                margin-top: 20px;
                flex-wrap: wrap;
              }
              button {
                font-size: 14px;
                font-weight: 500;
                padding: 12px 20px;
                background: #3b82f6;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: background 0.2s;
              }
              button:hover {
                background: #2563eb;
              }
              .whatsapp {
                background: #25d366;
              }
              .whatsapp:hover {
                background: #22c55e;
              }
              h1 {
                color: #1e293b;
                margin-bottom: 20px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>📋 Inventory Summary</h1>
              <pre id="text">${output}</pre>
              <div class="button-group">
                <button onclick="navigator.clipboard.writeText(document.getElementById('text').innerText).then(()=>alert('✅ Copied to clipboard!'))">
                  📋 Copy to Clipboard
                </button>
                <button class="whatsapp" onclick="window.open('https://wa.me/?text='+encodeURIComponent(document.getElementById('text').innerText))">
                  📱 Share on WhatsApp
                </button>
                <button onclick="window.print()">
                  🖨️ Print
                </button>
              </div>
            </div>
          </body>
        </html>
      `);
      w.document.close();
    }

    toast({
      title: "Summary Generated",
      description: "Your inventory summary has been generated and opened in a new window.",
    });
  };

  const copyToClipboard = () => {
    const output = generateOutput();
    navigator.clipboard.writeText(output).then(() => {
      toast({
        title: "Copied!",
        description: "Inventory summary copied to clipboard.",
      });
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Package className="text-primary" />
            Inventory Entry
          </h1>
          <p className="text-muted-foreground text-lg">Professional HVAC & Plumbing Inventory Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Project Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="siteName" className="text-base font-semibold">Site Name</Label>
                  <Input
                    id="siteName"
                    placeholder="e.g. working address"
                    value={formData.siteName}
                    onChange={(e) => setFormData({...formData, siteName: e.target.value})}
                    className="mt-2 text-base h-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search and Filter Bar */}
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            showOnlySelected={showOnlySelected}
            onShowSelectedChange={setShowOnlySelected}
            itemCounts={itemCounts}
          />

          {/* Inventory Sections */}
          {(shouldShowSection('pipes') && (!searchTerm || matchesSearch('copper pipes'))) && (
            <PipeSection 
              pipes={formData.pipes}
              onUpdate={(pipes) => setFormData({...formData, pipes})}
            />
          )}
          
          {(shouldShowSection('insulation') && (!searchTerm || matchesSearch('insulation'))) && (
            <InsulationSection 
              insulation={formData.insulation}
              onUpdate={(insulation) => setFormData({...formData, insulation})}
            />
          )}
          
          {(shouldShowSection('fittings') && (!searchTerm || matchesSearch('fittings elbow coupling'))) && (
            <FittingSection 
              fittings={formData.fittings}
              onUpdate={(fittings) => setFormData({...formData, fittings})}
            />
          )}
          
          {(shouldShowSection('nuts') && (!searchTerm || matchesSearch('flare nuts'))) && (
            <NutSection 
              nuts={formData.nuts}
              onUpdate={(nuts) => setFormData({...formData, nuts})}
            />
          )}

          {(shouldShowSection('tools') || shouldShowSection('materials')) && (
            (!searchTerm || matchesSearch('flaring tool brazing rods butane lpg drain heater hatlon oxygen nitrogen ac gas')) && (
              <SimpleSection 
                formData={formData}
                onUpdate={setFormData}
              />
            )
          )}
          
          {(shouldShowSection('wires') && (!searchTerm || matchesSearch('wires electrical'))) && (
            <WireSection 
              wires={formData.wires}
              onUpdate={(wires) => setFormData({...formData, wires})}
            />
          )}

          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-secondary/30">
            <CardContent className="pt-6">
              <div className="flex gap-4 flex-col sm:flex-row">
                <Button type="submit" className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90">
                  <Package className="mr-2 h-5 w-5" />
                  Generate Summary
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={copyToClipboard}
                  className="h-14 px-6"
                >
                  <Clipboard className="mr-2 h-5 w-5" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};