// screens/HomeScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categories = {
  '📰 Gündem Haberleri': [
    { name: 'Diken', url: 'https://www.diken.com.tr/', image: require('../assets/diken.png') },
    { name: 'T24', url: 'https://t24.com.tr/', image: require('../assets/t24.png') },
    { name: 'Euronews', url: 'https://tr.euronews.com/', image: require('../assets/euronews.png') },
    { name: 'Independent Turkish', url: 'https://www.indyturk.com/tags/reuters', image: require('../assets/independent.png') },
    { name: 'Anadolu Ajansı', url: 'https://www.aa.com.tr/tr/gundem', image: require('../assets/aa.png') },
    { name: 'BBC Türkçe', url: 'https://www.bbc.com/turkce', image: require('../assets/bbc.png') },
  ],
  '💸 Ekonomi & Finans Haberleri': [
    { name: 'Bigpara', url: 'https://bigpara.hurriyet.com.tr/', image: require('../assets/bigpara.png') },
    { name: 'Tradingview', url: 'https://tr.tradingview.com/markets/turkey/', image: require('../assets/tradingview.jpg') },
    { name: 'Tefas', url: 'https://www.tefas.gov.tr/', image: require('../assets/tefas.png') },
    { name: 'Bloomberg HT', url: 'https://www.bloomberght.com/', image: require('../assets/bloomberg.png') },
    { name: 'Financial Times', url: 'https://www.ft.com/', image: require('../assets/ft.png') },
    { name: 'CNBC', url: 'https://www.cnbc.com/world/?region=world', image: require('../assets/cnbc.png') },
  ],
  '🤖 Teknoloji Haberleri': [
    { name: 'Webtekno', url: 'https://www.webtekno.com/', image: require('../assets/webtekno.png') },
    { name: 'Chip', url: 'https://www.chip.com.tr/', image: require('../assets/chip.png') },
    { name: 'Technopat', url: 'https://www.technopat.net/', image: require('../assets/technopat.png') },
    { name: 'Shiftdelete', url: 'https://shiftdelete.net/', image: require('../assets/shiftdelete.png') },
    { name: 'Donanım Arşivi', url: 'https://donanimarsivi.com/', image: require('../assets/donanimarsivi.png') },
    { name: 'Cnet', url: 'https://www.cnet.com/', image: require('../assets/cnet.png') },
  ],
  '🧬 Bilim & Çevre Haberleri': [
    { name: 'Science Daily', url: 'https://www.sciencedaily.com/', image: require('../assets/sciencedaily.png') },
    { name: 'New Scientist', url: 'https://www.newscientist.com/', image: require('../assets/newscientist.png') },
    { name: 'Nature', url: 'https://www.nature.com/news', image: require('../assets/nature.png') },
    { name: 'Scientific American', url: 'https://www.scientificamerican.com/', image: require('../assets/scientificamerican.png') },
    { name: 'National Geographic', url: 'https://www.nationalgeographic.com/', image: require('../assets/nationalgeographic.png') },
    { name: 'TÜBİTAK Bilim Teknik', url: 'https://bilimteknik.tubitak.gov.tr/', image: require('../assets/tubitak.png') },
  ],
  '🎨 Kültür & Sanat Haberleri': [
    { name: 'Cumhuriyet', url: 'https://www.cumhuriyet.com.tr/kultur-sanat', image: require('../assets/cumhuriyet.png') },
    { name: 'Sanattan Yansımalar', url: 'https://www.sanattanyansimalar.com/', image: require('../assets/sanattanyansimalar.png') },
    { name: 'Artsy', url: 'https://www.artsy.net/', image: require('../assets/artsy.png') },
    { name: 'Artnews', url: 'https://www.artnews.com/', image: require('../assets/artnews.png') },
    { name: 'The Guardian', url: 'https://www.theguardian.com/uk/culture', image: require('../assets/theguardian.png') },
    { name: 'Hyperallergic', url: 'https://hyperallergic.com/', image: require('../assets/hyperallergic.png') },
  ],
  '🏟️ Spor Haberleri': [
    { name: 'Fotomaç', url: 'https://www.fotomac.com.tr/', image: require('../assets/fotomac.png') },
    { name: 'Sporx', url: 'https://www.sporx.com/', image: require('../assets/sporx.png') },
    { name: 'Fanatik', url: 'https://www.fanatik.com.tr/', image: require('../assets/fanatik.png') },
    { name: 'NTV Spor', url: 'https://www.ntvspor.net/', image: require('../assets/ntvspor.png') },
    { name: 'Goal', url: 'https://www.goal.com/tr', image: require('../assets/goal.png') },
    { name: 'Sky Sports', url: 'https://www.skysports.com/', image: require('../assets/skysports.png') },
  ],
  '🚑 Sağlık Haberleri': [
    { name: 'Sağlık Bakanlığı', url: 'https://www.saglik.gov.tr/', image: require('../assets/saglikbakanligi.png') },
    { name: 'Sağlık Haberleri', url: 'https://saglikhaberleri.com/', image: require('../assets/saglikhaberleri.png') },
    { name: 'Healthline', url: 'https://www.healthline.com/', image: require('../assets/healthline.png') },
    { name: 'Mayo Clinic', url: 'https://newsnetwork.mayoclinic.org/', image: require('../assets/mayoclinic.png') },
    { name: 'Harvard Health', url: 'https://www.health.harvard.edu/blog', image: require('../assets/harvardhealth.png') },
    { name: 'CDC', url: 'https://www.cdc.gov/media/', image: require('../assets/cdc.png') },
  ],
  '🎓 Eğitim Haberleri': [
    { name: 'MEB', url: 'https://www.meb.gov.tr/', image: require('../assets/meb.png') },
    { name: 'Eğitim Ajansı', url: 'https://www.egitimajansi.com/', image: require('../assets/egitimajansi.png') },
    { name: 'EdWeek', url: 'https://www.edweek.org/', image: require('../assets/edweek.png') },
    { name: 'Chronicle', url: 'https://www.chronicle.com/', image: require('../assets/chronicle.png') },
    { name: 'Inside Higher Ed', url: 'https://www.insidehighered.com/', image: require('../assets/insidehighered.png') },
    { name: 'Times Higher Education', url: 'https://www.timeshighereducation.com/', image: require('../assets/timeshighereducation.png') },
  ],
  '🛋️ Yaşam & Magazin Haberleri': [
    { name: 'Uçankuş', url: 'https://www.ucankus.com/', image: require('../assets/ucankus.png') },
    { name: 'People', url: 'https://people.com/', image: require('../assets/people.png') },
    { name: 'E! Online', url: 'https://www.eonline.com/', image: require('../assets/eonline.png') },
    { name: 'TMZ', url: 'https://www.tmz.com/', image: require('../assets/tmz.png') },
    { name: 'Entertainment Weekly', url: 'https://ew.com/', image: require('../assets/ew.png') },
    { name: 'Hello Magazine', url: 'https://www.hellomagazine.com/', image: require('../assets/hellomagazine.png') },
  ],
};

const openURL = async (url) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  } catch (error) {
    Alert.alert(`An error occurred: ${error.message}`);
  }
};

const Category = ({ category, data }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity style={styles.categoryHeader} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <Text style={styles.chevron}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.sitesContainer}>
          {data.map((site) => (
            <TouchableOpacity key={site.name} onPress={() => openURL(site.url)} style={styles.siteLogoContainer}>
              <Image source={site.image} style={styles.siteLogo} resizeMode="contain" />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const scrollRef = React.useRef(null);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  return (
    <View style={styles.mainContainer}>
      {/* Navigation Header bar matching designs */}
      <View style={styles.header}>
        <TouchableOpacity onPress={scrollToTop} style={styles.headerButton}>
          <Image source={require('../assets/home.png')} style={[styles.icon, styles.activeIcon]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FavoritesScreen')} style={styles.headerButton}>
          <Image source={require('../assets/fav.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserSettingsScreen')} style={styles.headerButton}>
          <Image source={require('../assets/user.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.container} ref={scrollRef} showsVerticalScrollIndicator={false}>
        {Object.keys(categories).map((category) => (
          <Category key={category} category={category} data={categories[category]} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerButton: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#5473A3', // Medium blue color matching mockup
  },
  activeIcon: {
    tintColor: '#2F4F7F', // Darker/active color
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  categoryContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  chevron: {
    fontSize: 14,
    color: '#000',
  },
  sitesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 16,
    paddingHorizontal: 8,
  },
  siteLogoContainer: {
    width: '25%',
    aspectRatio: 1,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  siteLogo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default HomeScreen;
