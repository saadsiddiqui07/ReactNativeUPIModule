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
  modalContent: {
    padding: 16,
    gap: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  cancelButton: {
    width: '50%',
    padding: 10,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  confirmButton: {
    backgroundColor: 'royalblue',
    width: '50%',
    padding: 10,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'royalblue',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF0000CC',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  selectedUPIAppImage: {
    width: 70,
    height: 70,
    borderRadius: 16,
  },
});

export default styles;
