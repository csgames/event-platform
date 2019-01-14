import 'package:CSGamesApp/components/event-image.dart';
import 'package:CSGamesApp/components/pagetransformer/pagetransformer.dart';
import 'package:CSGamesApp/domain/event.dart';
import 'package:CSGamesApp/services/localization.service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:meta/meta.dart';
import 'package:intl/intl.dart';

class EventPageItem extends StatelessWidget {
  EventPageItem({
    @required this.item,
    @required this.pageVisibility,
    @required this.onTap,
  });

  final Event item;
  final PageVisibility pageVisibility;
  final Function onTap;

  Widget _applyTextEffects({
    @required double translationFactor,
    @required Widget child,
  }) {
    final double xTranslation = pageVisibility.pagePosition * translationFactor;

    return Opacity(
      opacity: pageVisibility.visibleFraction,
      child: Transform(
        alignment: FractionalOffset.topLeft,
        transform: Matrix4.translationValues(
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
      child: Padding(
        padding: const EdgeInsets.only(top: 16.0),
        child: Text(
          item.name,
          style: textTheme.title.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.bold,
            fontFamily: 'Raleway'
          ),
          textAlign: TextAlign.center
        )
      )
    );

    final eventImage = EventImage(item);
    String code = LocalizationService.of(context).code;
    var formatter = DateFormat.yMMMMd(code);

    final eventDates = _applyTextEffects(
        translationFactor: 200.0,
        child: Padding(
            padding: const EdgeInsets.only(top: 16.0),
            child: Text(
              "${formatter.format(item.beginDate)} - ${formatter.format(
                  item.endDate)}",
              style: textTheme.subhead.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.normal,
                fontFamily: 'Raleway'
              ),
              textAlign: TextAlign.center,
            )));

    return Positioned(
      bottom: 56.0,
      left: 32.0,
      right: 32.0,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [eventImage, titleText, eventDates],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final image = Image.network(
      item.coverUrl,
      fit: BoxFit.cover,
      alignment: FractionalOffset(
        0.5 + (pageVisibility.pagePosition / 3),
        0.5,
      ),
    );

    final imageOverlayGradient = DecoratedBox(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: FractionalOffset.bottomCenter,
          end: FractionalOffset.topCenter,
          colors: [
            const Color(0xFF000000),
            const Color(0x00000000),
          ],
        ),
      ),
    );

    return GestureDetector(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(
            vertical: 30.0,
            horizontal: 8.0,
          ),
          child: Material(
            elevation: 4.0,
            borderRadius: BorderRadius.circular(8.0),
            child: Stack(
              fit: StackFit.expand,
              children: [
                image,
                imageOverlayGradient,
                _buildContent(context),
              ],
            ),
          ),
        ));
  }
}
