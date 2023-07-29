import { debugAnimations } from "./debugAnimations";
import { runInCircles } from "./runInCircles";
import "./style.css";

if (location.hash === "#debugAnimations") {
  debugAnimations();
} else {
  runInCircles();
}
