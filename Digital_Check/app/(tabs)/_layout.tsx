import React from 'react';
import { Tabs } from 'expo-router';
import { Icon } from '../../src/components/ui';
import { colors } from '../../src/theme';

const TAB_ICONS: Record<string, [string, string]> = {
  index: ['home-outline', 'home'],
  check: ['checkmark-circle-outline', 'checkmark-circle'],
  learn: ['book-outline', 'book'],
  quiz: ['help-circle-outline', 'help-circle'],
  profile: ['person-outline', 'person'],
};

function tab(name: string, title: string) {
  return {
    name,
    options: {
      title,
      tabBarAccessibilityLabel: title,
      tabBarIcon: ({ focused, color }: { focused: boolean; color: any }) => (
        <Icon name={TAB_ICONS[name][focused ? 1 : 0]} color={color ? String(color) : colors.primary} size={22} />
      ),
    },
  };
}

export default function TabsLayout() {
  const tabs = [
    tab('index', 'Beranda'),
    tab('check', 'Check'),
    tab('learn', 'Belajar'),
    tab('quiz', 'Kuis'),
    tab('profile', 'Profil'),
  ];
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#6F7F79',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        tabBarStyle: { backgroundColor: '#FFFFFF', borderTopColor: colors.line },
      }}
    >
      {tabs.map((t) => (
        <Tabs.Screen key={t.name} name={t.name} options={t.options} />
      ))}
    </Tabs>
  );
}
