export class GeometryUtils {

    /** получаем угол в градусах направления от источника к цели  /пример с вращающей пушкой она ловит направление на персонажа/ */
    static getAtangens(
      element: { y: number; x: number },
      target: { y: number; x: number }
    ) {
      return Math.atan2(target.y - element.y, target.x - element.x);
    }

    /** переводим градусы в радиану */
    static getRadiant(angle: number) {
      return angle / Math.PI * 180;
    }

    /** 
     * синусоид (y x положение елемента) 
     * (0.02 шаг волны) 
     * (range амплитуда - растояние колебания от y центра линии)  
     *  пример летающий powerup плавно меняя высоту 
    */
    static getSinusoid(y: number, x: number, range: number) {
      return y + Math.sin(x * 0.02) * range;
    }

}