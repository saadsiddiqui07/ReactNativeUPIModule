import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingVertical: 8,
  },
  appItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    margin: 4,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
  },
  appIcon: {
    width: 48,
    height: 48,
    marginBottom: 8,
    borderRadius: 8,
  },
  appName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  packageName: {
    fontSize: 12,
    marginLeft: 8,
    color: 'gray',
  },
  modalContainer: {
    backgroundColor: '#0000004D',
  },
});

export default styles;
