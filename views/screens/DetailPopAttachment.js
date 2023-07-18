import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from 'react-native';

const styles = StyleSheet.create({
  chooseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 8,
  },
  Input: {
    flex: 2.5,
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 35,
    marginBottom: 8,
  },
  pickBtn: {
    width: 100,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 8,
  },
  inputRightMargin: {
    marginRight: 5,
    marginBottom: 0,
  },
  flexEnd: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },

  fileContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
});

const DetailPop = () => {
  return (
    <View>
      <View style={styles.chooseContainer}>
        <TextInput style={[styles.Input, styles.inputRightMargin]}></TextInput>
        <TouchableOpacity style={styles.pickBtn} onPress={() => {}}>
          <Text>Attach</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.chooseContainer, styles.fileContainer]}>
        <Text style={styles.inputRightMargin}>첨부파일</Text>
        <View style={styles.chooseContainer}>
          <Text style={styles.inputRightMargin}>Ddunggu.jpg</Text>
          <TouchableOpacity style={styles.flexEnd} onPress={() => {}}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default DetailPop;
