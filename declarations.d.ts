declare module "*.svg"{
    import { SvgProps } from "react-native-svg";
    const content: React.StatelessComponents<SvgProps>;
    export default content;
}

