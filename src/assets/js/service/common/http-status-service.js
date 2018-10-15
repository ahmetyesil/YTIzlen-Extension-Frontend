class HttpStatusService {
    constructor() {
        this.alert_service = new AlertService();
        HttpStatusService.instance = this;
    }
    successHandler(data) {
        console.log('data',data)
        this.alert_service.open('success','Giriş işlemi başarılı');
    }
    errorHandler(err) {
        console.log('err',err);

        var status_code = err.status;
        switch (status_code){
            case 0:
                this.alert_service.open('danger','Lütfen internet bağlantınızı kontrol ediniz',3000);
                break;
            case 200:
                this.alert_service.open('danger','Başarılı',3000);
                break;
            case 401:
                this.alert_service.open('danger','Bilgilerinizi yanlış girdiniz. Lütfen kontrol ediniz.',3000);
                break;
            case 403:
                this.alert_service.open('danger','Bu işlem için yetkiniz bulunmamaktadır.',3000);
                break;
            case 404:
                this.alert_service.open('danger','Böyle bir kayıt bulunmamaktadır.',3000);
                break;
            case 409:
                this.alert_service.open('danger','Girilen bilgiler email veya kanal url sistemde mevcut. Şifrenizi unuttuysanız lütfen yeni şifre talep ediniz.',3000);
                break;
            case 422:
                this.alert_service.open('danger','İşlem yapılamadı. Lütfen girilen verileri kontrol ediniz.',3000);
                break;
            case 429:
                this.alert_service.open('danger','Çok fazla istek gerçekleştirdiniz. Lütfen daha sonra tekrar deneyiniz.',3000);
                break;
            case 500:
                this.alert_service.open('danger','Bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.',3000);
                break;
            default:
                this.alert_service.open('danger','Bu hata numarasını lütfen ilgili kişiye bildirin: ' + status_code,3000);

        }
    }

}



