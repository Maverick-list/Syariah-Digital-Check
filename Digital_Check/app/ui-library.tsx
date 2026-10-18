import React, { useState } from 'react';
import { View } from 'react-native';
import { Screen } from '../src/components/Screen';
import { Body, Button, Card, Chip, Eyebrow, Icon, ListItem, Notice, OptionRow, ProgressBar, StatusLabel, TextField } from '../src/components/ui';

export default function UiLibrary() {
  const [sel, setSel] = useState(0);
  const [text, setText] = useState('');
  return (
    <Screen back={{ label: 'Profil', fallback: '/(tabs)/profile' }} eyebrow="Design system" title="Komponen UI">
      <Eyebrow>Tombol</Eyebrow>
      <Card>
        <Button label="Button Primary" full onPress={() => {}} />
        <View style={{ height: 8 }} />
        <Button label="Button Secondary" variant="secondary" full onPress={() => {}} />
        <View style={{ height: 8 }} />
        <Button label="Button Ghost" variant="ghost" full onPress={() => {}} />
        <View style={{ height: 8 }} />
        <Button label="Disabled" full disabled onPress={() => {}} />
      </Card>
      <Eyebrow>Input</Eyebrow>
      <Card>
        <TextField label="Input field" placeholder="Masukkan teks..." value={text} onChangeText={setText} />
        <TextField label="Dengan error" value="" onChangeText={() => {}} error="Contoh pesan kesalahan." />
      </Card>
      <Eyebrow>Kartu, chip, status</Eyebrow>
      <Card>
        <ListItem icon="book-outline" title="Judul materi" subtitle="5 menit · 3 poin" onPress={() => {}} />
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginVertical: 8 }}>
          <Chip label="Akad" active />
          <Chip label="Digital" />
          <Chip label="Bank" />
        </View>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <StatusLabel label="Sukses" />
          <StatusLabel label="Peringatan" tone="warning" />
          <StatusLabel label="Info" tone="info" />
        </View>
      </Card>
      <Eyebrow>Pilihan & progres</Eyebrow>
      <Card>
        {['Opsi pertama', 'Opsi kedua'].map((o, i) => (
          <OptionRow key={o} label={o} selected={sel === i} onPress={() => setSel(i)} />
        ))}
        <View style={{ height: 8 }} />
        <ProgressBar percent={56} label="Contoh progres" />
      </Card>
      <Eyebrow>Ikon</Eyebrow>
      <Card>
        <View style={{ flexDirection: 'row', gap: 18 }}>
          {['home-outline', 'book-outline', 'help-circle-outline', 'person-outline', 'shield-checkmark-outline'].map((n) => (
            <Icon key={n} name={n} size={24} />
          ))}
        </View>
      </Card>
      <Notice tone="info">
        <Body>Pustaka ini mencerminkan token desain: primer #065F46, latar #F8F7F0, aksen #C7A76C.</Body>
      </Notice>
    </Screen>
  );
}
