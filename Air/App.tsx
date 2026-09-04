import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import './global.css';

type Screen = 'explore' | 'trips' | 'profile';

const homes = [
  { id: 1, title: 'Casa de diseño junto al mar', place: 'Tulum, México', price: '$186 noche', rating: '4.92', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80' },
  { id: 2, title: 'Refugio entre montañas', place: 'Valle de Bravo, México', price: '$142 noche', rating: '4.87', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=80' },
];

const categories = ['Todo', 'Playa', 'Cabañas', 'Ciudades'];

function ExploreScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todo');
  const [saved, setSaved] = useState<number[]>([]);
  const toggleSaved = (id: number) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-10">
      <View className="px-6 pb-5 pt-3">
        <View className="mb-7 flex-row items-center justify-between"><View><Text className="text-xs font-bold uppercase tracking-[3px] text-[#e5684b]">airbnb</Text><Text className="mt-1 text-3xl font-bold text-[#25313b]">Explora</Text></View><Image source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80' }} className="h-11 w-11 rounded-full" /></View>
        <View className="flex-row items-center rounded-2xl border border-[#e5e0d8] bg-white px-4 py-3 shadow-sm"><Text className="mr-3 text-lg text-[#e5684b]">⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="¿A dónde quieres ir?" placeholderTextColor="#8b9295" className="flex-1 text-[15px] text-[#25313b]" /><Pressable className="rounded-xl bg-[#25313b] px-3 py-2 active:opacity-70"><Text className="text-xs font-bold text-white">Buscar</Text></Pressable></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-6" contentContainerClassName="gap-2">{categories.map((item) => <Pressable key={item} onPress={() => setCategory(item)} className={`rounded-full px-4 py-2.5 ${category === item ? 'bg-[#25313b]' : 'border border-[#e5e0d8]'} active:opacity-70`}><Text className={`text-xs font-bold ${category === item ? 'text-white' : 'text-[#687277]'}`}>{item}</Text></Pressable>)}</ScrollView>
      </View>
      <View className="mb-7 px-6"><Image source={{ uri: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80' }} className="h-52 w-full rounded-3xl" /><View className="-mt-14 mx-4 rounded-2xl bg-[#f4ede4] px-4 py-3"><Text className="text-xs font-bold uppercase tracking-[2px] text-[#e5684b]">Colección del mes</Text><Text className="mt-1 text-lg font-bold text-[#25313b]">Escapadas que inspiran</Text></View></View>
      <View className="px-6"><View className="mb-4 flex-row items-end justify-between"><View><Text className="text-xl font-bold text-[#25313b]">Cerca de ti</Text><Text className="mt-1 text-sm text-[#8b9295]">Estancias seleccionadas</Text></View><Pressable className="active:opacity-60"><Text className="text-sm font-bold text-[#e5684b]">Ver todo</Text></Pressable></View>{homes.map((home) => <View key={home.id} className="mb-5 overflow-hidden rounded-3xl bg-white shadow-sm"><View><Image source={{ uri: home.image }} className="h-56 w-full" /><Pressable onPress={() => toggleSaved(home.id)} className="absolute right-4 top-4 h-10 w-10 items-center justify-center rounded-full bg-white/90 active:opacity-70"><Text className="text-lg">{saved.includes(home.id) ? '♥' : '♡'}</Text></Pressable></View><View className="p-4"><View className="flex-row justify-between"><Text className="flex-1 pr-3 text-base font-bold text-[#25313b]">{home.title}</Text><Text className="text-sm font-bold text-[#25313b]">★ {home.rating}</Text></View><Text className="mt-1 text-sm text-[#8b9295]">{home.place}</Text><Text className="mt-3 text-sm font-bold text-[#25313b]">{home.price}</Text></View></View>)}</View>
    </ScrollView>
  );
}

function TripsScreen() {
  return <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-6 pb-10 pt-4"><Text className="text-xs font-bold uppercase tracking-[3px] text-[#e5684b]">Tus planes</Text><Text className="mt-2 text-3xl font-bold text-[#25313b]">Viajes</Text><View className="mt-7 overflow-hidden rounded-3xl bg-[#25313b]"><Image source={{ uri: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80' }} className="h-48 w-full opacity-80" /><View className="p-5"><Text className="text-xs font-bold uppercase tracking-[2px] text-[#f2b59f]">Próximo viaje</Text><Text className="mt-2 text-2xl font-bold text-white">Oaxaca</Text><Text className="mt-1 text-sm text-[#cbd1d0]">12 - 16 de octubre · 2 huéspedes</Text><Pressable className="mt-5 self-start rounded-full bg-[#e5684b] px-5 py-3 active:opacity-70"><Text className="text-xs font-bold text-white">Ver reserva</Text></Pressable></View></View><Text className="mt-9 text-xl font-bold text-[#25313b]">Inspiración guardada</Text><View className="mt-4 flex-row items-center rounded-2xl border border-[#e5e0d8] bg-white p-3"><Image source={{ uri: homes[1].image }} className="h-20 w-20 rounded-xl" /><View className="ml-3 flex-1"><Text className="font-bold text-[#25313b]">Valle de Bravo</Text><Text className="mt-1 text-sm text-[#8b9295]">12 alojamientos guardados</Text></View><Text className="text-xl text-[#e5684b]">›</Text></View></ScrollView>;
}

function ProfileScreen() {
  return <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-6 pb-10 pt-4"><Text className="text-xs font-bold uppercase tracking-[3px] text-[#e5684b]">Cuenta</Text><View className="mt-6 flex-row items-center"><Image source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80' }} className="h-20 w-20 rounded-full" /><View className="ml-4"><Text className="text-2xl font-bold text-[#25313b]">Sofía Martín</Text><Text className="mt-1 text-sm text-[#8b9295]">Anfitriona desde 2021</Text></View></View><View className="mt-8 flex-row rounded-2xl bg-[#f4ede4] p-4"><View className="flex-1"><Text className="text-xl font-bold text-[#25313b]">4.98</Text><Text className="mt-1 text-xs text-[#687277]">Valoración</Text></View><View className="flex-1 border-l border-[#ded5ca] pl-4"><Text className="text-xl font-bold text-[#25313b]">28</Text><Text className="mt-1 text-xs text-[#687277]">Reseñas</Text></View></View>{['Datos personales', 'Preferencias', 'Centro de ayuda'].map((item) => <Pressable key={item} className="flex-row items-center border-b border-[#eee9e2] py-5 active:opacity-60"><Text className="flex-1 text-base font-semibold text-[#25313b]">{item}</Text><Text className="text-xl text-[#8b9295]">›</Text></Pressable>)}</ScrollView>;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('explore');

  return (
    <View className="flex-1 items-center justify-center bg-[#e8e5df]">
      <SafeAreaView className="h-[90vh] w-full max-w-[430px] overflow-hidden rounded-[32px] bg-[#fbfaf8]">
        
        {/* Contenido */}
        <View className="flex-1">
          {screen === 'explore' && <ExploreScreen />}
          {screen === 'trips' && <TripsScreen />}
          {screen === 'profile' && <ProfileScreen />}
        </View>

        {/* Navegación inferior */}
        <View className="flex-row border-t border-[#eee9e2] bg-[#fbfaf8] px-8 pb-3 pt-3">
          {(
            [
              ['explore', '⌂', 'Explorar'],
              ['trips', '▣', 'Viajes'],
              ['profile', '○', 'Perfil'],
            ] as const
          ).map(([key, icon, label]) => (
            <Pressable
              key={key}
              onPress={() => setScreen(key)}
              className="flex-1 items-center gap-1 active:opacity-60"
            >
              <Text
                className={`text-xl ${
                  screen === key
                    ? 'text-[#e5684b]'
                    : 'text-[#8b9295]'
                }`}
              >
                {icon}
              </Text>

              <Text
                className={`text-[11px] font-bold ${
                  screen === key
                    ? 'text-[#e5684b]'
                    : 'text-[#8b9295]'
                }`}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}