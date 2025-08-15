import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { FIRESTORE_DB } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AdminDashboard = () => {
  const { toast } = useToast();

  // --- LOGO ---
  const [logoType, setLogoType] = useState('text'); // 'text' | 'image'
  const [logoTitle, setLogoTitle] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [logoFile, setLogoFile] = useState(null);

  // --- FOOTER ---
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [restaurantPhone, setRestaurantPhone] = useState('');
  const [restaurantWhatsapp, setRestaurantWhatsapp] = useState('');
  const [restaurantMapsUrl, setRestaurantMapsUrl] = useState('');
  const [hoursText, setHoursText] = useState(''); // uma linha por horário: "Seg - Sex|12:00–15:00, 19:00–23:00"

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const configRef = doc(FIRESTORE_DB, 'config', 'ui');
  const storage = getStorage();

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(configRef);
        if (snap.exists()) {
          const d = snap.data();

          // logo
          setLogoType(d.logoType || 'text');
          setLogoTitle(d.logoTitle || '');
          setLogoUrl(d.logoUrl || '');

          // footer
          setRestaurantName(d.restaurantName || '');
          setRestaurantAddress(d.restaurantAddress || '');
          setRestaurantPhone(d.restaurantPhone || '');
          setRestaurantWhatsapp(d.restaurantWhatsapp || '');
          setRestaurantMapsUrl(d.restaurantMapsUrl || '');

          // converte array de objetos para texto (uma linha por horário: "Dia|Hora")
          if (Array.isArray(d.restaurantHours)) {
            const lines = d.restaurantHours
              .map(h => `${h.day || ''}|${h.time || ''}`.trim())
              .filter(Boolean)
              .join('\n');
            setHoursText(lines);
          }
        }
      } catch (e) {
        console.error(e);
        toast({
          title: 'Erro ao carregar',
          description: 'Não foi possível carregar as configurações.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setLogoFile(f);
  };

  const parseHours = (txt) => {
    // Formato esperado: uma linha por item -> "Seg - Sex|12:00–15:00, 19:00–23:00"
    return txt
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean)
      .map(l => {
        const [day, time] = l.split('|').map(s => (s ?? '').trim());
        return { day, time };
      })
      .filter(h => h.day || h.time);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalLogoUrl = logoUrl;

      if (logoType === 'image' && logoFile) {
        const path = `config/ui/logo-${Date.now()}-${logoFile.name}`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, logoFile);
        finalLogoUrl = await getDownloadURL(storageRef);
      }

      await setDoc(
        configRef,
        {
          // LOGO
          logoType,
          logoTitle: logoTitle || '',
          logoUrl: logoType === 'image' ? (finalLogoUrl || '') : '',

          // FOOTER
          restaurantName: restaurantName || '',
          restaurantAddress: restaurantAddress || '',
          restaurantPhone: restaurantPhone || '',
          restaurantWhatsapp: restaurantWhatsapp || '',
          restaurantMapsUrl: restaurantMapsUrl || '',
          restaurantHours: parseHours(hoursText),
        },
        { merge: true }
      );

      setLogoUrl(logoType === 'image' ? finalLogoUrl : '');
      setLogoFile(null);

      toast({
        title: 'Guardado com sucesso',
        description: 'As configurações foram atualizadas.',
      });
    } catch (e) {
      console.error(e);
      toast({
        title: 'Erro ao guardar',
        description: 'Verifica as permissões e a ligação.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">A carregar…</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold mb-2">Configurações do Site</h1>
        <p className="text-gray-600">Altere o logo e os dados do rodapé do cardápio público.</p>
      </motion.div>

      <Card className="border shadow-sm">
        <CardContent className="p-6 space-y-8">
          <form onSubmit={save} className="space-y-8">
            {/* ===== LOGO ===== */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Logo</h2>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Tipo de logo</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="logoType"
                      value="text"
                      checked={logoType === 'text'}
                      onChange={() => setLogoType('text')}
                    />
                    Texto
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="logoType"
                      value="image"
                      checked={logoType === 'image'}
                      onChange={() => setLogoType('image')}
                    />
                    Imagem
                  </label>
                </div>
              </div>

              {logoType === 'text' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Título / Logo (texto)</label>
                  <Input
                    placeholder='Ex.: "Restaurante Exemplo"'
                    value={logoTitle}
                    onChange={(e) => setLogoTitle(e.target.value)}
                  />
                </div>
              )}

              {logoType === 'image' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Selecionar imagem</label>
                    <input type="file" accept="image/*" onChange={onFileChange} />
                    <p className="text-xs text-gray-500 mt-1">
                      Altura máxima exibida no site: ~80px (ajustada automaticamente).
                    </p>
                  </div>

                  {(logoFile || logoUrl) && (
                    <div className="flex items-center gap-4">
                      {logoFile && (
                        <span className="text-xs text-gray-600">
                          Ficheiro: {logoFile.name}
                        </span>
                      )}
                      {logoUrl && !logoFile && (
                        <img
                          src={logoUrl}
                          alt="Logo atual"
                          className="h-16 object-contain border rounded p-1"
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Separator />

            {/* ===== RODAPÉ ===== */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Rodapé (informações do restaurante)</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome</label>
                  <Input value={restaurantName} onChange={e => setRestaurantName(e.target.value)} placeholder="Restaurante Exemplo" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefone</label>
                  <Input value={restaurantPhone} onChange={e => setRestaurantPhone(e.target.value)} placeholder="+351 912 345 678" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">Endereço</label>
                  <Input value={restaurantAddress} onChange={e => setRestaurantAddress(e.target.value)} placeholder="Rua das Flores, 123 — Porto" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">Horários (um por linha, formato: Dia|Hora)</label>
                  <textarea
                    className="w-full border rounded p-2 text-sm"
                    rows={5}
                    placeholder={`Seg - Sex|12:00–15:00, 19:00–23:00\nSáb|12:00–23:30\nDom|12:00–16:00`}
                    value={hoursText}
                    onChange={e => setHoursText(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 rounded bg-gray-900 text-white text-sm hover:bg-gray-800 disabled:opacity-50"
              >
                {saving ? 'A guardar…' : 'Guardar alterações'}
              </button>

              <span className="text-sm text-gray-500">
                Pré-visualização do título:&nbsp;
                {logoType === 'image' ? 'Imagem' : <span className="font-semibold">{logoTitle || 'SEU LOGO'}</span>}
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
