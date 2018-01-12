import 'package:PolyHxApp/components/pagetransformer/pagetransformer.dart';
import 'package:PolyHxApp/domain/event.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:meta/meta.dart';

class EventPageItem extends StatelessWidget {
  EventPageItem({
    @required this.item,
    @required this.pageVisibility,
  });

  final Event item;
  final PageVisibility pageVisibility;

  Widget _applyTextEffects({
    @required double translationFactor,
    @required Widget child,
  }) {
    final double xTranslation = pageVisibility.pagePosition * translationFactor;

    return new Opacity(
      opacity: pageVisibility.visibleFraction,
      child: new Transform(
        alignment: FractionalOffset.topLeft,
        transform: new Matrix4.translationValues(
          xTranslation,
          0.0,
          0.0,
        ),
        child: child,
      ),
    );
  }

  _buildContent(BuildContext context) {
    final TextTheme textTheme = Theme.of(context).textTheme;

    final titleText = _applyTextEffects(
      translationFactor: 200.0,
      child: new Padding(
        padding: const EdgeInsets.only(top: 16.0),
        child: new Text(
          item.name,
          style: textTheme.title
              .copyWith(color: Colors.white, fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
      ),
    );



    final eventImage = new Material(
        elevation: 4.0,
        borderRadius: new BorderRadius.circular(2.0),
        child: new Container(
            decoration: new BoxDecoration(
                border: new Border.all(
              color: Colors.white,
              width: 2.0,
            )),
            child: new Image.network(
              item.imageUrl,
              fit: BoxFit.cover,
              alignment: new FractionalOffset(
                0.5 + (pageVisibility.pagePosition / 3),
                0.5,
              ),
            )
        )
    );

    return new Positioned(
      bottom: 56.0,
      left: 32.0,
      right: 32.0,
      child: new Column(
        mainAxisSize: MainAxisSize.min,
        children: [eventImage, titleText],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final image = new Image.network(
      item.coverUrl,
      fit: BoxFit.cover,
      alignment: new FractionalOffset(
        0.5 + (pageVisibility.pagePosition / 3),
        0.5,
      ),
    );

    final imageOverlayGradient = new DecoratedBox(
      decoration: new BoxDecoration(
        gradient: new LinearGradient(
          begin: FractionalOffset.bottomCenter,
          end: FractionalOffset.topCenter,
          colors: [
            const Color(0xFF000000),
            const Color(0x00000000),
          ],
        ),
      ),
    );

    return new Padding(
      padding: const EdgeInsets.symmetric(
        vertical: 30.0,
        horizontal: 8.0,
      ),
      child: new Material(
        elevation: 4.0,
        borderRadius: new BorderRadius.circular(8.0),
        child: new Stack(
          fit: StackFit.expand,
          children: [
            image,
            imageOverlayGradient,
            _buildContent(context),
          ],
        ),
      ),
    );
  }
}
